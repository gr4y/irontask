['json', 'mongoid', 'nyny'].each do |lib|
  require lib
end

require 'irontask/version'
require 'irontask/class_loader'
LIB_PATH = File.join(File.dirname(__FILE__), "irontask")
ClassLoader.load(LIB_PATH)
require 'irontask/app'