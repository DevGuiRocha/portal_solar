class Simulation < ApplicationRecord
  belongs_to :client

  def pdf_url
    "/simulations/#{id}/simulation_#{client_id}_#{created_at.to_i}.pdf"
  end
end
