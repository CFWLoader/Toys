require 'rexml/document'

include REXML

class DBLPpreprocessor
end

if __FILE__ == $0

  puts '--BEGIN--'

  doc = Document.new File.open './sample.xml'

  dblp_root = doc.elements['dblp']

  count = 0

  author_count = 0

  dblp_root.elements.each { |ele|

    # att_list = ele.attributes['mdate']

    author_list = []

    ele.each_element('author') { |author|
      author_list << author.get_text
    }

    author_list.display

    puts

    # att_list.display

    # att_list.display

    count += 1

  }

  puts count

  puts author_count

end