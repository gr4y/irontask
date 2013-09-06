module Irontask

  class App < NYNY::App
    use Rack::Static, 
      :urls => ["/css", "/js", "/images", "/components"],
      :root => File.join(LIB_PATH, "public"),
      :index => "index.html"

    before {
      Mongoid.load!("mongoid.yml", ENV['RACK_ENV'])
      headers 'Content-Type' => 'application/json'
    }

    after {
      body = response.raw_body
      response.body = body.to_json if body.respond_to? :to_json
    }

    get '/tasks' do
      Task.all.reverse
    end

    post '/task/new' do
      task = params[:task]
      if task.is_a?(String)
        task = JSON.parse(task)
      end
      Task.create(task)
    end

    delete '/task/:id' do
      task = Task.find(params[:id])
      { :id => task.id, :is_deleted => task.remove }
    end

    post '/task/:id' do
      task = Task.find(params[:id])
      json_task = JSON.parse(params[:task])
      task.update_attributes(json_task)
      task
    end

  end

end