import React from 'react';
import { render } from 'react-dom';

// this is a quick and dirty React filter, just for prototyping!

// a simple stateless function
const Item = props => {
    const { id, title, link, type, image } = props.data;

    const styles = {
        backgroundImage: 'url(http://www.heyuguys.com/images/2015/10/Back-to-the-Future-Promo-Photo.jpg)'
    };

    return (
        <div className="c-media-object">
            <div className="c-media-object__item">
                <div className="c-background-image" style={styles}></div>
            </div>
            <div className="c-media-object__body">
                <h3><a href={link}>{title}</a></h3>
            </div>
        </div>
    );
};

// our component to render
class Filter extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            query: '',
            pens: []
        };

        this.onSearch = this.onSearch.bind(this);
    }

    componentDidMount() {
        fetch('https://gist.githubusercontent.com/onefastsnail/3b69a4844622879dcedd68858644db7b/raw/82a9e8b8ab10509dc60056b683068654e13045a9/pens.json').then(function (response) {
            return response.json();
        }).then((json) => {
            this.setState({ pens: json });
        });
    }

    // a function to trigger out state change, a cheap way to bind this
    onSearch(e) {
        this.setState({ query: e.target.value });
    }

    render() {

        // a very dirty way to create a array of filtered pens as it filters upon every rerender :(
        const pens = this.state.pens.filter(pen => pen.title.toLowerCase().indexOf(this.state.query.toLowerCase()) > -1);

        return (
            <div className="s-filter">
                <input
                    type="text"
                    name="search"
                    value={this.state.query}
                    onChange={this.onSearch}
                    className="s-filter__search"
                    placeholder={`Search ${pens.length} pens`}
                />

                <div className="s-filter__results">
                    <div className="l-columns" data-column-count="2">
                        {pens.map(item => <div className="l-columns__item" key={item.id}><Item data={item} /></div>)}
                    </div>
                </div>
            </div>
        );
    }
}

render(<Filter />, document.getElementById('react-filter'));
