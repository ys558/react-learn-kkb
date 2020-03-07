import React from 'react'
import PropTypes from 'prop-types'

export const connect = (mapStateToProps = state => state, mapDispatchToProps = {}) => 
  WrapComponent => class ConnectComponent extends React.Component {
    static contextTypes = {
      store: PropTypes.object
    }
    constructor(props, context){
      super(props, context)
      this.state = {
      props:{}
      }
    }
    componentDidMount(){
      const {store} = this.context
      store.subscribe(()=>this.update())
      this.update()
    }
    update(){
      const {store} = this.context
      const stateProps = mapStateToProps(store.getState())
      const dispatchProps = bindActionCreators(mapDispatchToProps, store.dispatch)
      this.setState({
        props:{
        ...this.state.props,
        ...stateProps,
        ...dispatchProps
        }
      })
    }
    render(){
      console.log(this.state.props)
      return <WrapComponent {...this.state.props}></WrapComponent>
    }
  }

export class Provider extends React.Component {
  static childContextTypes = {
    store: PropTypes.object
  }
  getChildContext() {
    return { store: this.store }
  }
  constructor(props, context) {
    super(props, context)
    this.store = props.store
  }
  render() {
    return this.props.children
  }
}