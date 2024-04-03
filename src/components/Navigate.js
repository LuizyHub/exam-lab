import { Link } from 'react-router-dom';

export default function Navigate() {
    return (
        <div>
            <nav>
                <div>
                    <Link to='/select' style={{ textDecoration: 'none', color: 'inherit' }}>기출문제</Link>
                </div>
                <div>
                    <Link to='/add' style={{ textDecoration: 'none', color: 'inherit' }}>나만의 시험지</Link>
                </div>
            </nav>
        </div>
    );
}
