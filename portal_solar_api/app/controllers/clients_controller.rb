class ClientsController < ApplicationController
  before_action :set_client, only: [:show, :update, :destroy]

  def index
    @clients = Client.all
    render json: @clients
  end

  def show
    @client = Client.find(params[:id])
    render json: @client
  end

  def create
    @client = Client.new(client_params)
    if @client.save
      render json: @client, status: :created
    else
      render json: @client.errors, status: :unprocessable_entity
    end
  end

  def update
    @client = Client.find(params[:id])
    if @client.update(client_params)
      render json: @client, status: :ok
    else
      render json: @client.errors, status: :unprocessable_entity
    end
  end

  def destroy
    client = Client.find(params[:id])
    if client.destroy
      render json: { message: 'Cliente deletado com sucesso' }, status: :ok
    else
      render json: { error: 'Erro ao deletar o cliente' }, status: :unprocessable_entity
    end
  end

  private

  def set_client
    @client = Client.find(params[:id])
  end

  def client_params
    params.require(:client).permit(:name, :email, :password)
  end

end
