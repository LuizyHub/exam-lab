import React, { useState } from 'react';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

// 한글 폰트 등록
Font.register({
  family: 'NanumGothic',
  src: './font/NanumGothic-Regular.ttf', // 폰트 파일의 경로를 정확히 지정하세요.
});
// 폰트 라이선스에 주의하라.


const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
    padding: 10,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
    fontFamily: 'NanumGothic', // 등록된 폰트를 사용
    fontSize: 4,
  },
  input: {
    marginBottom: 10,
  },
});


export default function Pdf() {

  const [inputs, setInputs] = useState(Array(5).fill(''));

  const handleInputChange = (index, value) => {
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);
  };

  const MyDocument = (
    <Document>
      <Page size="A4" style={styles.page}>
        {inputs.map((input, index) => (
          <View key={index} style={styles.section}>
            <Text>{` ${index + 1}: ${input}`}</Text>
          </View>
        ))}
      </Page>
    </Document>
  );

  return (
    <div>
      <h1>PDF 전환하기</h1>
      <PDFDownloadLink document={MyDocument} fileName="inputs.pdf">
        {({ blob, url, loading, error }) =>
          loading ? 'Loading document...' : 'Download PDF'
        }
      </PDFDownloadLink>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <input
          className='examTitle'
          style={{
            width: '300px',
            height: '50px',
            fontSize: '20px',
            textAlign: 'center', // 텍스트 중앙 정렬
          }}
          placeholder='시험지 제목' // 기본값으로 보여줄 텍스트
        />
      </div>

      <br /> <hr /> <br />

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ flex: 1 }}>
          {inputs.slice(0, 5).map((input, index) => (
            <input
              key={index}
              type="text"
              value={input}
              onChange={(e) => handleInputChange(index, e.target.value)}
              style={styles.input}
            />
          ))}
        </div>

        <div style={{ width: '1px', backgroundColor: 'black', margin: '0 20px' }}></div> {/* 세로 줄 */}

        <div style={{ flex: 1 }}>
          {inputs.slice(5).map((input, index) => (
            <input
              key={index + 5} // 인덱스 조정
              type="text"
              value={input}
              onChange={(e) => handleInputChange(index + 5, e.target.value)}
              style={styles.input}
            />
          ))}
        </div>
      </div>
    </div>
  );
}