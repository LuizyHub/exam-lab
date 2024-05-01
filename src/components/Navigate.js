import { Link } from 'react-router-dom';
import '../css/Navigate.css';

export default function Navigate() {
    return (
        <div>
            <nav className="navigation">
                <div className="nav-item">
                    <img src="/img/시험지샘플.png" alt="Main Image" className="nav-icon" />
                    <Link to='/exams' className="nav-link">시험지 제작하기</Link>
                </div>
                <div className="nav-item">
                    <img src="/img/시험지제작.png" alt="Main Image" className="nav-icon" />
                    <Link to='/editR' className="nav-link">나만의 시험지</Link>
                </div>
            </nav>
        </div>
    );
}
