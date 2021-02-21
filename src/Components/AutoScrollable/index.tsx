import * as React from 'react';
import { DataSource } from '../../Helpers/api';
import LoadingSpinner from '../LoadingSpinner';

interface AutoScrollableProps<T> {
    data: DataSource<T>;
    template: (item: T) => JSX.Element;
    whenEmpty?: JSX.Element;
};

const root = () : HTMLElement => document.getElementById('root')!;
export default class AutoScrollable<T> extends React.Component<AutoScrollableProps<T>> {

    private onScroll : any = null;
    scrollHandler() {
        if (!this.props.data.complete && !this.props.data.loading && this.atBottom())
            this.props.data.load();
    }

    atBottom(gap: number = 16): boolean {
        if (root() === null)
            return false;
        return root().scrollTop + root().clientHeight >= root().scrollHeight - gap;
    }

    private update : any;
    componentDidMount() {
        this.update = this.forceUpdate.bind(this);
        this.onScroll = this.scrollHandler.bind(this);
        this.props.data.onUpdate(this.update);

        root().addEventListener('scroll', this.onScroll);

        this.props.data.load();
    }
    componentWillUnmount() {
        this.props.data.offUpdate(this.update);
        root().removeEventListener('scroll', this.onScroll);
    }

    componentWillReceiveProps(nextProps : any) {
        if (this.props.data !== nextProps.data) {
            this.props.data.offUpdate(this.update);
            nextProps.data.onUpdate(this.update);
            nextProps.data.load();
        }
    }

    render() {
        return (
            <>
                { this.props.data.items.map(item => this.props.template(item)) }
                { !this.props.data.loading && this.props.data.items.length === 0 && this.props.whenEmpty }
                { this.props.data.loading && <LoadingSpinner center-x /> }
            </>
        )
    }
}