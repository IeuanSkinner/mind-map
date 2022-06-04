class HomeController < ApplicationController
  def index
    @mind_maps = MindMap.all
    @links = Link.all
    @topic_areas = TopicArea.all

    render 'index'
  end
end
