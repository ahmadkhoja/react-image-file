import * as React from 'react'
import {Component,PropTypes} from 'react';
import {EMPTY,DONE,ERROR,LOADING} from './constants';

export type CropAttribute = 'cover'|'contain'|'none'

export type ImageTemplateProps = {
	src:string
	alt:string
	loadingURL?:string
	errorURL?:string
	emptyURL?:string
	status?:string
	width?:string|number
	height?:string|number
	crop?:CropAttribute
	type?:'img'|'div'
}


export const statusAsAttr = (status:string) => `data-status-${status}`	

export const renderDIV = (src:string,status:string,alt:string,width:string|number,height:string|number,crop:CropAttribute)=>{
	const style = {
		width
	,	height
	,	backgroundImage:`url('${src}')`
	,	backgroundSize:crop
	,	backgroundRepeat:'no-repeat'
	,	backgroundPosition:'50% 50%'
	,	[statusAsAttr(status)]:true
	}
	const props = {
		title:alt
	,	style
	}
	return <div {...props}/>
}

export const renderIMG = (src:string,status:string,alt:string,width:string|number,height:string|number)=>{
	const props = {
		src
	,	alt
	,	width
	,	height
	,	[statusAsAttr(status)]:true
	}
	return <img {...props}/>
}


export const getStatus = (props) => props.status || DONE;

export const getSRC = (status,props)=>{
	const {loadingURL,errorURL,emptyURL,src} = props;
	return (
		status === LOADING && loadingURL ? 
			loadingURL :
			status === ERROR && errorURL ? 
				errorURL :
				status === EMPTY && emptyURL ? 
					emptyURL :
					src
	);
}

export const getType = (props:ImageTemplateProps) => props && props.type ? props.type : 'div'

export const getCrop = (props:ImageTemplateProps):CropAttribute => props && props.crop ? props.crop : 'contain'

export default class ImageTemplate extends Component<ImageTemplateProps,{}>{
	static propTypes = {
		src:PropTypes.string.isRequired
	,	alt:PropTypes.string.isRequired
	,	loadingURL:PropTypes.string
	,	errorURL:PropTypes.string
	,	emptyURL:PropTypes.string
	,	status:PropTypes.oneOf([EMPTY,DONE,ERROR,LOADING])
	,	width:PropTypes.oneOfType([PropTypes.string,PropTypes.number])
	,	height:PropTypes.oneOfType([PropTypes.string,PropTypes.number])
	,	crop:PropTypes.oneOf(['cover','contain','none'])
	,	type:PropTypes.oneOf(['img','div'])
	};
	static defaultProps = {
		type:'div'
	,	crop:'contain'
	}
	render(){
		const {alt,width,height} = this.props;
		const status = getStatus(this.props);
		const src = getSRC(status,this.props)
		const type = getType(this.props);
		const crop = getCrop(this.props); 
		return (getType(this.props)==='img') ? 
			renderIMG(src,status,alt,width,height) : 
			renderDIV(src,status,alt,width,height,crop);
	}
}