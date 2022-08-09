class HomeController < ApplicationController
  def index
    @mind_maps = MindMap.all.map(&:json)
    @links = Link.all.map(&:json)
    @topic_areas = TopicArea.all.map(&:json)

    render 'index'
  end
end
