import React, { Component } from 'react'

/**
 * @装饰器
 * npm install --save-dev babel-plugin-transform-decorators-legacy
 * 见config-overrides.js里的配置
 * 配置完需重启
 */

const KkbWithName = Comp => {
	const api = 'HOC课程3'
	return class extends Component{
		componentDidMount(){ console.log('do sth. 3') }
		render(){
			return <Comp {...this.props} name={api} ></Comp>
		}
	}
}

const withLog = Comp => {
	console.log(`${Comp.name}渲染了`)
	return props => <Comp {...props}></Comp>
}


// 装饰器Kkb只能在class组件调用, 也和链式一样可多次调用, 且KkbWithName, withLog等高阶组件只能写在Kkb前面
@withLog
@KkbWithName
@withLog
class Kkb extends Component {
	render(){
		return<div>{this.props.stage}--{this.props.name}</div>
	}
}


export default class HOC3 extends Component {
	render() {
		return (
			<div>
				<Kkb stage='React3'></Kkb>
			</div>
		)
	}
}

