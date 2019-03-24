
import React, {Component} from 'react';
import Intro from '../../component/Intro/Intro'
import MinimalCoverVideo from '../../component/MinimalCoverVideo/MinimalCoverVideo'
import HomePageInfo from '../../component/HomePageInfo/HomePageInfo'
class HomePage extends Component{
    render(){
        return(
            <div>
                <Intro />
                <MinimalCoverVideo />
                
                <HomePageInfo />
                <MinimalCoverVideo />
                
            </div>

        )
    }
}

export default HomePage;