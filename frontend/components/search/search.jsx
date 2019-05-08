import React from 'react';
import { withRouter } from 'react-router-dom';

class Search extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            title: props.location.search.slice(7).replace(/%20/, ' ')
        }
        this.updateTitle = this.updateTitle.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    updateTitle(e){
        this.setState({ title: e.target.value })
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.history.push(`/search?query=${this.state.title}`);
        this.props.search({title: this.state.title})
            // this.props.history.push(`/search?query=${this.state.title}`);
            // this.setState({ title: "" });
            // if (this.state.title == ""){
            //     this.props.history.push("/listings");
            // }else {
            //     this.setState({title: ""});
            //     this.props.history.push("/search");
            // }

    }

    render(){
        return(
            <form onSubmit={this.handleSubmit} id="nav-search" className="header-search-nav-form" method="" action="">
                <div className="header-search-bar-inner">
                    <div className="header-search-bar-input-wrapper" >
                        <input id="search-query" type="text"
                            placeholder="Search for items or shops" value={this.state.title} onChange={this.updateTitle}/>
                    </div>
                    <div className="header-search-button-wrapper">
                        <button className="btn btn-primary">Search</button>
                    </div>
                </div>
            </form>

        );
    };
};

export default withRouter(Search);