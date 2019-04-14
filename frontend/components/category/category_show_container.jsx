import {connect} from 'react-redux'
import { getListingsByCategory } from '../../actions/category_actions';
import CategoryShow from './category_show'
import { selectListingsByAuthor } from '../../reducers/selectors';


const mapStateToProps = (state, ownProps) => {
    let listingsByAuthor;
    listingsByAuthor = selectListingsByAuthor(state.entities, ownProps.match.params.userId);


    return({
        category: ownProps.match.params.categoryId,
        sessionId: state.session.id,  
        listings: listingsByAuthor,
    })
}

const mapDispatchToProps = dispatch => {
    return {
        getListingsByCategory: (listingId) => dispatch(getListingsByCategory(listingId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryShow)