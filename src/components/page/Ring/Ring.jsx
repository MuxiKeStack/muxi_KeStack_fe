import Taro, {Component} from '@tarojs/taro'
import {View, Canvas} from '@tarojs/components'
import './Ring.scss'

class Ring extends Component{

    componentWillMount(){
        const res = Taro.getSystemInfoSync()
        const radius = res.screenWidth / 750 * 50;
        const radiusIn = res.screenWidth / 750 * 48;
        const{
            type,
            percent1,
            percent2,
            percent3,
            percent4
        } = this.props
        const ctx = Taro.createCanvasContext('ring');
        const p1 = parseInt(percent1);
        const p2 = parseInt(percent2);
        const p3 = parseInt(percent3);
        const p4 = parseInt(percent4);
        parseInt(percent1)
        ctx.beginPath();
        ctx.arc(radius,radius,radius,Math.PI*2 + Math.PI*3/2,Math.PI/180*3.6*p1 + Math.PI*3/2,false);
        ctx.arc(radius,radius,radiusIn,Math.PI/180*3.6*p1 + Math.PI*3/2,Math.PI*2 + Math.PI*3/2,true);
        ctx.closePath();
        ctx.fillStyle = '#9154B8';
        ctx.fill();
        ctx.beginPath();
        ctx.arc(radius,radius,radius,Math.PI/180*3.6*p1 + Math.PI*3/2,Math.PI/180*3.6*(p1 + p2) + Math.PI*3/2,false);
        ctx.arc(radius,radius,radiusIn,Math.PI/180*3.6*(p1 + p2) + Math.PI*3/2,Math.PI/180*3.6*p1 + Math.PI*3/2,true);
        ctx.closePath();
        ctx.fillStyle = '#F9D57F';
        ctx.fill();
        ctx.beginPath();
        ctx.arc(radius,radius,radius,Math.PI/180*3.6*(p1 + p2) + Math.PI*3/2,Math.PI/180*3.6*(p1 + p2 + p3) + Math.PI*3/2,false);
        ctx.arc(radius,radius,radiusIn,Math.PI/180*3.6*(p1 + p2 + p3) + Math.PI*3/2,Math.PI/180*3.6*(p1 + p2) + Math.PI*3/2,true);
        ctx.closePath();
        ctx.fillStyle = '#D8D8D8';
        ctx.fill();

        if(p4){
            ctx.beginPath();
            ctx.arc(radius,radius,radius,Math.PI/180*3.6*(p1 + p2 + p3) + Math.PI*3/2,Math.PI/180*3.6*(p1 + p2 + p3 + p4) + Math.PI*3/2,false);
            ctx.arc(radius,radius,radiusIn,Math.PI/180*3.6*(p1 + p2 + p3 + p4) + Math.PI*3/2,Math.PI/180*3.6*(p1 + p2 + p3) + Math.PI*3/2,true);
            ctx.closePath();
            ctx.fillStyle = '#FD817E';
            ctx.fill();
        }

        ctx.fillStyle = '#9154B8';
        ctx.font= '23rpx';
        ctx.textAlign = 'center'; 
        ctx.textBaseline = 'middle';
        ctx.fillText(`${type}`, radius, radius);

        ctx.draw();
    }

    render(){
        const{
            percent1,
            percent2,
            percent3,
            percent4,
            name1,
            name2,
            name3,
            name4
        } = this.props

        return(
            <View className='box'>
                <View className='canvasBox'>
                    <Canvas style='width: 100px; height: 100px;' canvasId='ring' />
                </View>         
                <View className='levels' style='font-size: 20rpx'>
                    <View className='item'>
                        <View className='circle1'></View>
                        <View className='level'>{name1}：{percent1}%</View>
                    </View>
                    <View className='item'>
                        <View className='circle2'></View>
                        <View className='level'>{name2}：{percent2}%</View>
                    </View>
                    <View className='item'>
                        <View className='circle3'></View>
                        <View className='level'>{name3}：{percent3}%</View>
                    </View>
                    {name4 && <View className='item'>
                        <View className='circle4'></View>
                        <View className='level'>{name4}：{percent4}%</View>
                    </View>}
                </View>
            </View> 
        )
    }
}

Ring.defaultProps = {
    type: '成绩',
    percent1: '45',
    percent2: '35',
    percent3: '15',
    percent4: '',
    name1: '70以下',
    name2: '70-85',
    name3: '85以上',
    name4: ''
}

export default Ring;