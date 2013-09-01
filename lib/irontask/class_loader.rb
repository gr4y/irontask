# Loads all classes in the right order
module ClassLoader
  extend self

  # This does the loading of the classes.
  # @todo Here is a huge space for improvement
  def load(lib_dir)
    ['models', 'helpers', 'controllers'].each do |class_dir|
      path = File.join(File.join(lib_dir, class_dir), %w[** *.rb])
      Dir[path].each do |name|
        require name
      end
    end
  end  
end