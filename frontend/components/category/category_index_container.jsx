
import { connect } from 'react-redux';
import { getListingsByCategory } from "../../actions/category_actions";
import CategoryIndex from './category_index'

const mapStateToProps = state => {
    return {
        currentUserId: state.session.id,
        listings: state.entities.listings
    }
}

const mapDispatchToProps = dispatch =>{ 
    return {
        getListingsByCategory: (categoryId) => dispatch(getListingsByCategory(categoryId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryIndex);