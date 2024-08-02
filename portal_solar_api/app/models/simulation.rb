class Simulation < ApplicationRecord
  belongs_to :client

  def pdf_url
    "public/simulations/simulation_#{client_id}_#{created_at.to_i}.pdf"
  end
end


# /mnt/c/projetos/portal_solar/portal_solar_api/public/simulations/simulation_17_1722569951.pdf