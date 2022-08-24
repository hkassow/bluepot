class UsersController < ApplicationController
    def show
        user = User.find_by(id: session[:user_id])
        if user
          render json: user
        else
          render json: { error: "Not authorized" }, status: :unauthorized
        end
      end
      def show_other
        user = User.find_by(username: params[:username])
        render json: user, serializer: UserWithCommentsAndPostsSerializer
      end
      def create
        user = User.create(user_params)
        if user.valid?
          render json: user, status: :created
        else
          render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
        end
      end
      def destroy
        user = User.find(params[:id])
        user.destroy
      end
    
      private
    
      def user_params
        params.permit(:username, :password)
      end
end
