# Homepage (Root path)

require 'json'

get '/' do
  erb :index
end

get '/contacts/:name' do
end

get '/contacts' do
  @contacts = Contact.all
  @contacts.to_json
end

post '/contacts' do
  @contact = Contact.new params.slice('first_name', 'last_name', 'email', 'phone_number')
  if @contact.save
    halt 200, {'Content-Type' => 'application/json'}, @contact.to_json
  else
    erb :index
  end
end

delete '/contacts/:id' do
end

post '/contacts/:id' do
end
