class Api::V1::WordsRequestsController < ApplicationController
  def create
    non_english_words = WordsQueries.call(text_params)
    render json: non_english_words
  end

  private

  def text_params
    params.require(:text).permit(:value)
  end
end
