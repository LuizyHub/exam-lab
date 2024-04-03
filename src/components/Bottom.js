export default function Bottom(){
    return(
        <div style={{ display: 'flex', bottom: 0, justifyContent: 'space-between', width:'100%', height:'200px', backgroundColor:'#F0F2F5'}}>
            <div style={{ display: 'flex', flexDirection: 'column', marginLeft:'10px'}}>
                <p>시험지 연구소</p>
                <div> 
                    <p>UPTO</p>
                    주소 : 서울특별시 성북구 삼선교로16길 116
                </div>
            </div>
            <div style={{ display: 'flex', marginTop:'20px'}}>
                <span style={{marginRight:'10px'}}>개인정보처리방침 </span>
                <span style={{marginRight:'10px'}}>쿠키정책 </span>
                <span style={{marginRight:'10px'}}>쿠키설정 </span>
                <span style={{marginRight:'10px'}}>웹사이트이용약관 </span>
                <span style={{marginRight:'10px'}}>Responsivle disclosure</span>
            </div>
        </div>
    );
}
