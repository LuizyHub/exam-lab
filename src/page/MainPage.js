import NavigationBar from '../components/NavigationBar';
import Navigate from '../components/Navigate';
import Bottom from '../components/Bottom';

export default function MainPage(){
    return(
        <div className="main-page">
            <NavigationBar />
            <div className="page-content">
                <h1> 시험지 연구소 </h1>
                <Navigate />
                <img src="https://previews.123rf.com/images/anawat/anawat1601/anawat160100284/50001062-%EC%97%B0%EA%B5%AC%EC%9B%90%EC%9D%80-%EC%8B%A4%ED%97%98%EC%8B%A4%EC%97%90%EC%84%9C-%ED%99%94%ED%95%99-%EB%B0%A9%EC%A0%95%EC%8B%9D-%EB%B0%B0%EA%B2%BD%EC%9C%BC%EB%A1%9C-%EC%8B%9C%ED%97%98%EA%B4%80%EC%97%90-%EC%8B%9C%EC%95%BD%EC%9D%84-%EB%96%A8%EC%96%B4.jpg" alt="Main Image" />
            </div>
            <footer>
                <Bottom />
            </footer>
        </div>
    );
}
