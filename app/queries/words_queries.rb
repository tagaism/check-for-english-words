class WordsQueries
  class << self
    def call(params)
      text = params[:value]
      find_non_english_words(text)
    end

    private

    def find_non_english_words(text)
      text_array = text.scan(/\w+/).map(&:capitalize)
      set_of_input_words = Set.new text_array
      set_of_non_english_words = set_of_input_words - Vocabulary::WORDS
      non_english_words = set_of_non_english_words.to_a.uniq
    end
  end
end