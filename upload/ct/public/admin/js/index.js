$(function () {
    barCharts()
    pieCharts()
})
var barCharts = function () {
    //通常都是后台取的data，先做个假数据模拟
    var data = [
        {
            name: '一月',
            value: 150
        },
        {
            name: '二月',
            value: 400
        },
        {
            name: '三月',
            value: 500
        },
        {
            name: '四月',
            value: 530
        },
        {
            name: '五月',
            value: 350
        },
        {
            name: '六月',
            value: 130
        }
    ]
    var xdata = [], ydata = []
    data.forEach(function (item,i) {
        xdata.push(item.name)
        ydata.push(item.value)
    })

    var box = document.querySelector('.picTable:first-child')
    var myChart = echarts.init(box)
    var options = {
        title:{
            text:'2017年注册人数'
        },
        legend:{
            data:['注册人数']
        },
        color: ['#3398DB'],
        tooltip: {},
        xAxis: [
            {
                data: xdata
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: '注册人数',
                type: 'bar',
                barWidth: '60%',
                data: ydata
            }
        ]
    }
    myChart.setOption(options)
}

var pieCharts = function () {
    var box = document.querySelector('.picTable:last-child')
    var myChart = echarts.init(box)
    var options = {
        title : {
            text: '销售占比情况',
            subtext: '2019年7月',
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            //series.name a
            //series.data.name b
            //series.data.value c
            //计算后百分比 d
            formatter: "{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: ['李宁','耐克','阿迪达斯','匡威','匹克']
        },
        series : [
            {
                name: '销售情况',
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data:[
                    {value:335, name:'李宁'},
                    {value:310, name:'耐克'},
                    {value:234, name:'阿迪达斯'},
                    {value:135, name:'匡威'},
                    {value:1548, name:'匹克'}
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    }
    myChart.setOption(options)
}