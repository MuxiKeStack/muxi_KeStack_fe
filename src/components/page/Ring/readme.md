**名称** | **描述** | **默认** |**可选值** | **类型** 
:--:|:--:|:--:|:--:|:--:
type | 环形图中心要写的类型名 | type | |String
percent1 | 紫色值占比（不要写百分号，只写数字） | |0 - 100 | String
percent2 | 黄色值占比（不要写百分号，只写数字） | |0 - 100 | String
percent3 | 灰色值占比（不要写百分号，只写数字） | |0 - 100 | String
sector1 | 紫色分级名称 | | | String
sector2 | 黄色分级名称 | | | String
sector3 | 灰色分级名称 | | | String

### example:
```
<Ring
    type='成绩'
    percent1='13'
    percent2='76'
    percent3='11'
    name1='经常点名'
    name2='偶尔点名'
    name3='从不点名' 
/>
```
