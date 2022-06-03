# app/models/concerns/label.rb

module Label extend ActiveSupport::Concern
  @@char_count = 18

  def format_label(text)
    words = text.split
    lines = [""]
    
    words.each do |word|
      last_line = lines.pop

      if last_line.length.zero?
        lines << word
      elsif last_line.length + word.length + 1 >= @@char_count
        lines << last_line
        lines << word
      else
        lines << "#{last_line} #{word}"
      end
    end

    lines
  end
end