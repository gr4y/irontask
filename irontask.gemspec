# coding: utf-8
lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'irontask/version'

Gem::Specification.new do |spec|
  spec.name          = "irontask"
  spec.version       = Irontask::VERSION
  spec.authors       = ["gr4y"]
  spec.email         = ["swessel@gr4yweb.de"]
  spec.description   = %q{easy task-management}
  spec.summary       = %q{easy task-management}
  spec.homepage      = "https://github.com/gr4y/irontask"
  spec.license       = "MIT"

  spec.files         = `git ls-files`.split($/)
  spec.executables   = spec.files.grep(%r{^bin/}) { |f| File.basename(f) }
  spec.test_files    = spec.files.grep(%r{^(test|spec|features)/})
  spec.require_paths = ["lib"]

  spec.add_development_dependency "bundler", "~> 1.3"
  spec.add_development_dependency "rake"
  spec.add_development_dependency "tux"

  spec.add_runtime_dependency "nyny", "~> 1.0.1"
  spec.add_runtime_dependency "mongoid", "~> 3.1.4"
  # spec.add_runtime_dependency "tilt", "~> 1.4.1"
  # spec.add_runtime_dependency "haml", "~> 4.0.3"
  # spec.add_runtime_dependency "sinatra"
  spec.add_runtime_dependency "rack"
end