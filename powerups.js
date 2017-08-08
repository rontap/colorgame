//this whole thing is going to be a huge Object.


if (localStorage.achieveList==undefined)  achieveList = "0000000000" //storing binary array in numbers because fuck JSON
else    achieveList=localStorage.achieveList

selected = 0

pwrup =  [
          {
              name:'Amplify',
              desc: '20% bonus to buu',
              require : () => level>50 ,
              runs : () => alert()
          }, 
          {
              name:'Save The Day',
              desc:'20% less to dooom',
              require : () => Math.floor(level/loopvar.doomOccurrance)>10 , //!
              runs : () => alert()
          },
          {
              name:'Eye for an eye',
              desc:'35% bonus to upgrades but 10% more doom',
              require : () => (level>100)&&(difficulty>1) , //!
              runs : () => alert()
          },
          {
              name:'Helping hand',
              desc:'5% chance of automatically continuing in a perfect match',
             // require : () => comboList.length>10 , //!
              runs : () => alert()
          },
          {
              name:'Jackpot',
              desc:'50% more points and score from combos',
              require : () => pointsFromCombo.sum()>1000 , //!
              runs : () => alert()
          },
          {
              name:'Headstart I',
              desc:'game starts from level 50',
              require : () => level>250 , //!
              runs : () => level=50
          },
          {
              name:'Headstart II',
              desc:'game starts from level 111',
              require : () => level>666 , 
              runs : () => level=111
          },
          {  
              name:'Powernap',
              desc:'more time between levels',
              require : () => playtime>600 , //!
              runs : () => timeBetweenLevels = 1200 
          },
          
          {
              name:'Insane Difficulty',
              desc:'game starts from level 111',
              require : () => null , //!
              runs : () => alert()
          },
           {
              name:'Zen Mode',
              desc:'infinite time, infinite possibilities', //needs to be added later!!!
              require : () => null , //!
              runs : () => alert()
          },
          
          
        ]


function isAchievementGet(nth,setAch) {
  
    setAch = typeof(setAch) == 'undefined' ? null : setAch;
    if (setAch!=null) {
        a = new Array (...achieveList)
        a[add]=1
        achieveList=a.join("")
        localStorage.achieveList=achieveList
    }
    else {
        return Number(localStorage.achieveList[nth])
    }
}