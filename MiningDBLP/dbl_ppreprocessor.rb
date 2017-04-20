require 'rexml/document'

include REXML

class DBLPpreprocessor
end

if __FILE__ == $0

  puts '--BEGIN--'

  doc = Document.new File.open './dblp.xml'

  extracted = open './extracted', 'w'

  dblp_root = doc.elements['dblp']

  dblp_root.elements.each { |ele|

    # att_list = ele.attributes['mdate']

    pro_list = []

    ele.each_element('author') { |author|
      pro_list << author.get_text
    }

    pro_list.each {|name|

      extracted << name

      extracted << ','

    }

    extracted << ele.elements['year'].get_text

    extracted.puts

    # att_list.display

    # att_list.display

  }

  extracted.close

  puts '--END--'

  # puts count
  #
  # puts author_count

end