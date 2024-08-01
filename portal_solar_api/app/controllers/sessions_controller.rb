class SessionsController < ApplicationController
  def create
    client = Client.find_by(email: params[:email])
    if client&.authenticate(params[:password])
      render json: client, status: :ok
    else
      render json: { error: 'Email ou Senha inválidos!!' }, status: :unauthorized
    end
  end
end
