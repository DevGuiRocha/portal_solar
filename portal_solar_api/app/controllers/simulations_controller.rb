require 'prawn'
require 'httparty'


class SimulationsController < ApplicationController
  before_action :set_client
  before_action :check_simulation_limit, only: :create

  def create
    # Simulação de energia baseada nos dados do cliente
    power_needed = params[:bill_value].to_f / 94.5

    response = HTTParty.get('https://my.api.mockaroo.com/geradores?key=630e7920&page=1&page_size=10')
    generators = response.parsed_response

    recommended_generators = generators.select do |g|
      power_output = g['power_output']
      power_output && power_output >= power_needed
    end

    pdf = generate_pdf(@client, recommended_generators)

    simulation = @client.simulations.create!(
      bill_value: params[:bill_value],
      recommended_generators: recommended_generators,
      pdf: pdf
    )

    render json: { simulation: simulation }, status: :created
  end

  def index
    simulations = @client.simulations
    render json: { simulations: simulations }
  end

  private

  def set_client
    @client = Client.find(params[:client_id])
  end

  def check_simulation_limit
    if @client.simulations.where('created_at >= ?', Time.zone.now.beginning_of_day).count >= 5
      render json: { error: 'Você já atingiu o limite de 5 simulações para hoje' }, status: :forbidden
    end
  end

  # def generate_pdf(client, generators)
  #   pdf = Prawn::Document.new
  #   pdf.text "Relatório de Simulação de Energia"
  #   pdf.text "Cliente: #{client.name}"
  #   pdf.text "Email: #{client.email}"
  #   pdf.text "Simulações:"

  #   generators.each_with_index do |generator, index|
  #     pdf.text "#{index + 1}. Modelo: #{generator['model']}, Potência: #{generator['power_output']} kWp"
  #   end

  #   file_path = Rails.root.join('public', 'simulations', "simulation_#{client.id}_#{Time.now.to_i}.pdf")
  #   pdf.render_file(file_path)
  #   file_path.to_s
  # end

  def generate_pdf(client, generators)
    Prawn::Fonts::AFM.hide_m17n_warning = true
    # Geração do caminho do arquivo PDF
    directory = Rails.root.join('public', 'simulations')
    FileUtils.mkdir_p(directory) unless File.directory?(directory)
    
    file_path = "#{directory}/simulation_#{client.id}_#{Time.now.to_i}.pdf"
  
    Prawn::Document.generate(file_path) do |pdf|
      pdf.text "Simulação de Geradores", size: 30, style: :bold
      pdf.move_down 20
      pdf.text "Cliente: #{client.name}"
      pdf.text "Email: #{client.email}"
      pdf.move_down 10
      pdf.text "Geradores Recomendados:", size: 20, style: :bold
      generators.each do |generator|
        pdf.text "Gerador: #{generator['name']} - Potência: #{generator['power_output']} kWp"
      end
    end
  
    file_path
  end
  
end
