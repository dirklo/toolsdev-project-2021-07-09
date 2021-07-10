class HomeController < ApplicationController 
    def index
        @days = Day.all
        render 'home/index'
    end
end
