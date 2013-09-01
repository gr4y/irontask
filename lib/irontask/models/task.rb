class Task
  include Mongoid::Document

  field :description, type: String
  field :done, type: Boolean, default: false

end