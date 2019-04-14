@categories.each do |category_item|
    json.category_item do 
        json.set! category_item.id do
            json.extract! category_item, :id, :listing_id
        end
    end

    json.listings do 
        json.set! category_item.listing.id do
            json.id category_item.listing.id
            json.title category_item.listing.title
        end
    end

    #json.listings do 
    #    json.extract! category_item.listing, :id, :title 
    #end

end


