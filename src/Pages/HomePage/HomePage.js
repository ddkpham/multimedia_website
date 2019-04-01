
import React, {Component} from 'react';
import Intro from '../../component/Intro/Intro'
import MinimalCoverVideo from '../../component/MinimalCoverVideo/MinimalCoverVideo'
import HomePageInfo from '../../component/HomePageInfo/HomePageInfo'
class HomePage extends Component{
    render(){
        let randNum = Math.floor(Math.random() * Math.floor(4));
        return(
            <div>
                <Intro />
                <MinimalCoverVideo randNum={randNum}/>
                
                <HomePageInfo />
                <MinimalCoverVideo randNum={randNum}/>
                
            </div>

        )
    }
}

export default HomePage;