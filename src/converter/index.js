const csvtojson=require('csvtojson')
const fs=require('fs')

const csvfilepath='../../data/seedData.csv';
let res;

csvtojson().fromFile(csvfilepath).then((data)=>{
    res=data
    let resData=res.map((val)=>{
        const items=val.items.split(';')
        items.pop()
        const newItemObj=items.reduce((acc,curr)=>{
            const itemDataSplit=curr.split(':')
            const itemObj={};
            itemObj[itemDataSplit[0]]=itemDataSplit[1]
            return {...acc,...itemObj}
        },{})
        val.items=newItemObj
        return {...val}
    })
    fs.writeFileSync('data.json',JSON.stringify(resData),'utf-8',(err)=>{
        if(err){
            console.log(err)
        }
    })
})
