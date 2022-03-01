class HomeController < ApplicationController
  def index
    @mind_maps = MindMap.all

    render 'index'
  end
end
