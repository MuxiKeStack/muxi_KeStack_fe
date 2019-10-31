import Taro, {Component} from '@tarojs/taro'
import {View, Canvas} from '@tarojs/components'
import './Ring.scss'

class Ring extends Component{

    componentWillMount(){
        const res = Taro.getSystemInfoSync()
        const point = res.screenWidth / 750 * 50;
        const radiusOut = res.screenWidth / 750 * 50;
        const radiusIn = res.screenWidth / 750 * 48;
        const PALETTE = ["#9154B8", "#FD817E", "#D8D8D8", "#F9D57F"];

        function toInt(percent){
            return parseInt(percent)
        }
        const ANGLE1 = [toInt(courseGrade70), toInt(courseGrade70) + toInt(courseGrade7085), toInt(courseGrade70) + toInt(courseGrade7085) + toInt(courseGrade85)];
        const ANGLE2 = [toInt(attendance1), toInt(attendance1) + toInt(attendance2), toInt(attendance1) + toInt(attendance2) + toInt(attendance3)];
        const ANGLE3 = [toInt(inspection1), toInt(inspection1) + toInt(inspection2), toInt(inspection1) + toInt(inspection2) + toInt(inspection3), toInt(inspection1) + toInt(inspection2) + toInt(inspection3) + toInt(inspection4)];

        function computeAngle(percent){
            return Math.PI/180*3.6*percent + Math.PI*3/2
        }
        function drawSector(beginAngle, finishAngle, color, ctx){
            ctx.beginPath();
            ctx.arc(point,point,radiusOut,computeAngle(beginAngle),computeAngle(finishAngle),false);
            ctx.arc(point,point,radiusIn,computeAngle(finishAngle),computeAngle(beginAngle),true);
            ctx.closePath();
            ctx.fillStyle = color;
            ctx.fill();
        }
        function drawRing(ctx, ANGLE, type){
            drawSector(0, ANGLE[0], PALETTE[0], ctx);
            drawSector(ANGLE[0], ANGLE[1], PALETTE[3], ctx);
            drawSector(ANGLE[1], ANGLE[2], PALETTE[2], ctx);
            if(ANGLE[3]){drawSector(ANGLE[2], ANGLE[3], PALETTE[3], ctx);}
            ctx.fillStyle = '#9154B8';
            ctx.font= '23rpx';
            ctx.textAlign = 'center'; 
            ctx.textBaseline = 'middle';
            ctx.fillText(`${type}`, radiusOut, radiusOut);
            ctx.draw();
        }
        drawRing(Taro.createCanvasContext('ring1'), ANGLE1, '成绩');
        drawRing(Taro.createCanvasContext('ring2'), ANGLE2, '考勤');
        drawRing(Taro.createCanvasContext('ring3'), ANGLE3, '考核');
        // const{
        //     type,
        //     percent1,
        //     percent2,
        //     percent3,
        //     percent4
        // } = this.props
        // const ctx = Taro.createCanvasContext('ring');
        // const p1 = parseInt(percent1);
        // const p2 = parseInt(percent2);
        // const p3 = parseInt(percent3);
        // const p4 = parseInt(percent4);

        // ctx.beginPath();
        // ctx.arc(radius,radius,radius,Math.PI*2 + Math.PI*3/2,Math.PI/180*3.6*p1 + Math.PI*3/2,false);
        // ctx.arc(radius,radius,radiusIn,Math.PI/180*3.6*p1 + Math.PI*3/2,Math.PI*2 + Math.PI*3/2,true);
        // ctx.closePath();
        // ctx.fillStyle = '#9154B8';
        // ctx.fill();
        // ctx.beginPath();
        // ctx.arc(radius,radius,radius,Math.PI/180*3.6*p1 + Math.PI*3/2,Math.PI/180*3.6*(p1 + p2) + Math.PI*3/2,false);
        // ctx.arc(radius,radius,radiusIn,Math.PI/180*3.6*(p1 + p2) + Math.PI*3/2,Math.PI/180*3.6*p1 + Math.PI*3/2,true);
        // ctx.closePath();
        // ctx.fillStyle = '#F9D57F';
        // ctx.fill();
        // ctx.beginPath();
        // ctx.arc(radius,radius,radius,Math.PI/180*3.6*(p1 + p2) + Math.PI*3/2,Math.PI/180*3.6*(p1 + p2 + p3) + Math.PI*3/2,false);
        // ctx.arc(radius,radius,radiusIn,Math.PI/180*3.6*(p1 + p2 + p3) + Math.PI*3/2,Math.PI/180*3.6*(p1 + p2) + Math.PI*3/2,true);
        // ctx.closePath();
        // ctx.fillStyle = '#D8D8D8';
        // ctx.fill();

        // if(p4){
        //     ctx.beginPath();
        //     ctx.arc(radius,radius,radius,Math.PI/180*3.6*(p1 + p2 + p3) + Math.PI*3/2,Math.PI/180*3.6*(p1 + p2 + p3 + p4) + Math.PI*3/2,false);
        //     ctx.arc(radius,radius,radiusIn,Math.PI/180*3.6*(p1 + p2 + p3 + p4) + Math.PI*3/2,Math.PI/180*3.6*(p1 + p2 + p3) + Math.PI*3/2,true);
        //     ctx.closePath();
        //     ctx.fillStyle = '#FD817E';
        //     ctx.fill();
        // }

        // ctx.fillStyle = '#9154B8';
        // ctx.font= '23rpx';
        // ctx.textAlign = 'center'; 
        // ctx.textBaseline = 'middle';
        // ctx.fillText(`${type}`, radius, radius);

        // ctx.draw();
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
                    <Canvas style='width: 100px; height: 100px;' canvasId='ring1' />
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
                <View className='canvasBox'>
                    <Canvas style='width: 100px; height: 100px;' canvasId='ring2' />
                </View>
                <View className='canvasBox'>
                    <Canvas style='width: 100px; height: 100px;' canvasId='ring3' />
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