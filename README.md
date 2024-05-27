<div align="center">
  <h1> ExamLab🧪</h1>

![Frame 30](https://github.com/LuizyHub/exam-lab/assets/120697456/22de4a75-8e4a-4624-9fa6-1106a443b844)
</div>

> 배포 링크 <br />
> **https://exam-lab.store/**

<br/>

<p align=center>
  <a href="">팀 노션</a>
  &nbsp; | &nbsp; 
  <a href="">개발위키</a>
  &nbsp; | &nbsp;
  <a href="https://bow-snail-89d.notion.site/6b0f7d9d2e574e1597de6c6c19a68ded?pvs=4">기획서</a>   &nbsp; | &nbsp;
  <a href="https://bow-snail-89d.notion.site/Ground-Rule-4c2c96afbfbf4a6aa1353a4ed6517daa?pvs=4">그라운드 룰</a> 
  <br />
  <a href="https://www.figma.com/design/MfCRRB3bWLgo4YMorH7M4U/졸작_디자인?node-id=438-1940&t=iFzQIb6C351DL0Wr-0">figma</a>
  &nbsp; | &nbsp; 
  <a href="https://github.com/users/LuizyHub/projects/2">백로그</a>
</p>

<div align=center>
<a href="https://hits.seeyoufarm.com"><img src="https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2FLuizyHub%2Fexam-lab&count_bg=%232DB3B4&title_bg=%23555555&icon=&icon_color=%23FFFFFF&title=hits&edge_flat=false"/></a>
</div>

## 📄 목차

- [📄 목차](#-목차)
- [📝 프로젝트 개요](#-프로젝트-개요)
- [💡 핵심 기능](#-핵심-기능)
  - [빠른 맞춤 검색](#빠른-맞춤-검색)
  - [AI 문제 생성](#ai-문제-생성)
  - [PDF 시험지 생성](#pdf-시험지-생성)
- [🛠️ 기술 스택](#-기술-스택)
- [🖇️ 시스템 구조도](#-시스템-구조도)
- [🔎 FE 기술적 도전](#-fe-기술적-도전)
  - [사이드바 네비게이션 구현](#사이드바-네비게이션-구현)
  - [문제 검색 페이지의 구성](#문제-검색-페이지의-구성)
  - [문제 편집 툴 제작](#문제-편집-툴-제작)
  - [PDF 변환](#pdf-변환)
- [🔎 BE 기술적 도전](#-be-기술적-도전)
  - [테스트코드로 Swagger생성](#테스트코드로-swagger생성)
  - [서버 성능에 맞춰 DB 구축](#서버-성능에-맞춰-db-구축)
  - [데이터 베이스 선택을 위해 추상화를 사용해서 NoSQL, SQL 둘 다 사용](#데이터-베이스-선택을-위해-추상화를-사용해서-nosql-sql-둘-다-사용)
  - [Testcontainer를 이용한 Test코드 작성](#testcontainer를-이용한-test코드-작성)
  - [AI 문제 생성하기](#ai-문제-생성하기)
- [🧑🏻‍💻 팀원 소개 👩🏻‍💻](#ai-프롬프트-설정하기)

<br />

## 📝 프로젝트 개요

웹 프로젝트 “시험지 연구소"는 사용자 중심의 효율적인 학습 도구를 제공하는 것을 목표로 합니다. 저희는 문제에 태그, 검색어와 같은 조건을 통해 맞춤형 시험지를 생성합니다. 손쉽게 AI문제 생성하고 활용할 수
있습니다. 사용자는 제작한 시험지를 pdf로 생성 및 출력이 가능하며 이를 통해 효율적인 학습 및 점검이 가능합니다.

<br />

## 💡 핵심 기능

### 빠른 맞춤 검색

> Elasticsearch 검색 엔진을 활용하여, 사용자는 검색어와 태그를 통해 원하는 문제를 빠르고 정확하게 찾을 수 있습니다. 다양한 주제, 난이도, 문제 유형 등을 설정하여 필요한 문제를 즉시 검색해 맞춤형
> 시험지를 생성해 보세요.

<img alt='selectQeustion' src="https://github.com/LuizyHub/exam-lab/assets/120697456/d08e1ff5-f093-4651-8419-a8cb9870908a" /> 

### AI 문제 생성

> 최신 GPT-4o를 사용하여 학습 자료를 기반으로 10초 만에 5개의 문제를 자동 생성합니다. 빠르고 정확한 문제 생성으로 학습 효율을 높이세요.

<img alt='addAI' src="https://github.com/LuizyHub/exam-lab/assets/120697456/b42020de-7de9-4d89-80ba-0d89101535fe" /> 

### PDF 시험지 생성

> 사용자가 선택한 문제들을 모아 표준화된 형태로 시험지를 생성하고 출력 할 수 있습니다. '나만의 시험지'를 통해 효율적인 학습과 출제가 가능한 PDF 시험지를 만들어보세요.

<!--<img alt='' src="" /> -->

<br />

## 🛠️ 기술 스택

<table>
    <thead>
        <tr>
            <th>분류</th>
            <th>기술 스택</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>
                <p>개발 도구</p>
            </td>
            <td>
                <img src="https://img.shields.io/badge/IntelliJ IDEA-c94799?logo=IntelliJ IDEA&logoColor=ffffff">
                <img src="https://img.shields.io/badge/Visual Studio Code-007ACC?logo=Visual Studio Code&logoColor=ffffff">
            </td>
        </tr>
        <tr>
            <td>
                  <p>언어</p>
            </td>
            <td>
                  <img src="https://img.shields.io/badge/java-0d8ac7?logo=openjdk&logoColor=ec2025">
                  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?logo=JavaScript&logoColor=000000">
            </td>
        </tr> 
        <tr>
            <td>
                <p>데이터 베이스</p>
            </td>
            <td>
                <img src="https://img.shields.io/badge/Elasticsearch-3ab8ac?logo=Elasticsearch&logoColor=e9b919">
                <img src="https://img.shields.io/badge/MongoDB-114411?logo=mongodb">
                <img src="https://img.shields.io/badge/Amazon S3-7D929E?logo=Amazon S3&logoColor=ffffff">
                <img src="https://img.shields.io/badge/Docker-2496ED?&logo=Docker&logoColor=white">
            </td>
        </tr>
        <tr>
            <td>
                <p>프레임 워크</p>
            </td>
            <td>
                <img src="https://img.shields.io/badge/React-61DAFB?logo=React&logoColor=ffffff">
                <img src="https://img.shields.io/badge/Spring Boot-114411?logo=Spring Boot&logoColor=ffffff">
            </td>
        </tr>
        <tr>
            <td>
                <p>AI</p>
            </td>
            <td>
                <img src="https://img.shields.io/badge/OpenAI-74AA9C?&logo=OpenAI&logoColor=ffffff">
            </td>
        </tr>
                <tr>
            <td>
                <p>배포</p>
            </td>
            <td>
                <img src="https://img.shields.io/badge/Nginx-009639?logo=Nginx&logoColor=ffffff&">
                <img src="https://img.shields.io/badge/Amazon EC2-FF9900?logo=Amazon EC2&logoColor=ffffff">
                <img src="https://img.shields.io/badge/GitHub Actions-2088FF?logo=github-actions&logoColor=ffffff">
            </td>
        </tr>
        <tr>
            <td>
                <p>협업</p>
            </td>
            <td>
                <img src="https://img.shields.io/badge/GitHub-181717?logo=GitHub&logoColor=ffffff">
                <img src="https://img.shields.io/badge/Notion-000000?logo=Notion">
                <img src="https://img.shields.io/badge/Discord-5865F2?logo=Discord&Color=&logoColor=ffffff">
            </td>
        </tr>
    </tbody>
</table>

<br />

## 🖇️ 시스템 구조도

![시스템 아키텍처](https://github.com/LuizyHub/exam-lab/assets/120697456/0b7463fa-f35e-4750-ae61-6855267b49f8)

<br />

## 🔎 FE 기술적 도전

### 사이드바 네비게이션 구현
<!--
| 이미지 예시                                                                                                                      | 이미지 예시                                                                                                                 |
| ------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| <img alt="" src="" /> | <img alt="" src="" /> |
-->
- 페이지의 가독성을 높이기 위해 상단 네비게이션바 대신 사이드바를 구현하였습니다.
- 사이드바는 모든 페이지에서 활용되며, 상태에 따라 동적으로 움직이도록 설계되었습니다.
- 이 과정에서 전역 상태 관리와 관련된 여러 어려움이 있었지만, 이를 통해 인터페이스의 일관성을 유지할 수 있었습니다.

### 문제 검색 페이지의 구성
<!--<img width="70%" alt="" src=""> -->
- 문제, 지문, 이미지, 선택지 등 문제의 규격이 제각각이라 사용자에게 보기 좋게 페이지를 구성하는 데 어려움이 있었습니다.
- 사용자가 원하는 문제를 장바구니처럼 담아 나만의 시험지를 제작할 수 있도록 하였으며, 문제를 한눈에 볼 수 있고 중복되지 않도록 구성했습니다.

### 문제 편집 툴 제작
<!--
| 이미지 예시                                                                                                                      | 이미지 예시                                                                                                                 |
| ------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| <img alt="" src="" /> | <img alt="" src="" /> |
-->
- 필요한 편집 기능만을 제공하여 입력 칸을 제어하기 위해 직접 편집 툴을 제작했습니다.
- 사용자에게 필요한 편집 기능을 제공하기 위해 라이브러리를 사용하지 않고 직접 편집 툴을 제작하였습니다.
- 단순히 input 요소를 사용하는 대신 contentEditable을 활용하고 다양한 이벤트를 통해 사용자 입력의 UX를 개선하고자 했습니다.
- 이 과정에서 사용자 경험(UX) 요소와 디자인적인 고려 사항을 배우게 되었습니다.
- 아쉬운 점은 execCommand() 메소드를 대체할 로직을 완전히 구현하지 못한 부분이 있었습니다. 하지만 이를 통해 에디터를 제작하는 많은 기술적 도전을 경험하였습니다.

### PDF 변환
<!--
| 이미지 예시                                                                                                                      | 이미지 예시                                                                                                                 |
| ------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| <img alt="" src="" /> | <img alt="" src="" /> |
-->
- 사용자가 제작한 시험지를 쉽게 출력하여 풀어볼 수 있도록 PDF 형식으로 변환할 수 있습니다.
- 이를 위해 react-pdf의 <b>PDFDownloadLink</b> 컴포넌트를 사용하여 구현하였습니다.
- react-pdf 라이브러리의 내장 컴포넌트인 View와 Page 등을 활용하여 pdf 라이브러리를 조금 이나마 알 수 있었습니다.
- 원하는 만큼의 퍼포먼스를 내지 못한 부분 이였습니다. 이는 제가 생각했던 CSS 방식과 pdf 라이브러리에 적용될 수 있는 부분의 한계를 느낀 아쉬운 부분이었습니다.

<br />

## 🔎 BE 기술적 도전

### 테스트코드로 Swagger생성
<img width="85%" alt="createSwagger" src="https://github.com/LuizyHub/exam-lab/assets/120697456/541cae50-d117-48d7-a165-b9f7a66b34ab" >

- API 문서에 신뢰성 : Spring REST Docs를 사용해 테스트코드를 기반으로 api 문서 생성
- 효과적인 API 문서 : Swagger UI를 도입해 직접 api를 실행하고 볼 수 있는 문서 생성
- 자동 생성 : Spring REST Docs로 OpenAPI3 문서를 만들 기 위한 restdocs-api-spec 라이브러리 사용
- 기술 블로그 : https://code-l.tistory.com/36

### 서버 성능에 맞춰 DB 구축

<img width="30%" alt="DBStructure" src="https://github.com/LuizyHub/exam-lab/assets/120697456/6df18add-6586-4246-b6c4-03ef8f20d8cc">

- 개발 과정에서 불필요한 자원을 줄이고자 제한된 서버에 DB 서버를 구축했습니다.
- 이를 위해 서버와 Docker의 로그를 분석하여 2GB 노드 1개와 1GB Kibana 구성을 통해 필요한 성능에 맞춰 DB를 최적화했습니다.
- 현재는 배포를 앞두고 향상된 서버에 4GB 노드 3개와 2GB Kibana 구성으로 전환하여 이용 중입니다. 이를 통해 불필요한 서버 유지 비용을 방지할 수 있었습니다.
- 기술 블로그: https://developerjisu.tistory.com/104

### 데이터 베이스 선택을 위해 추상화를 사용해서 NoSQL, SQL 둘 다 사용

| JPA 구현                                                                                                           | MongoDB 구현                                                                                                      |
|------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------|
| <img  alt="" src="https://github.com/LuizyHub/exam-lab/assets/120697456/8f49f334-6dfb-42f7-a461-7217511cac4c" /> | <img alt="" src="https://github.com/LuizyHub/exam-lab/assets/120697456/6b686682-209a-4fc1-b66e-ca0265a89173" /> |

- **유연한 데이터베이스 선택**: Spring의 Dependency Injection(DI) 기능과 추상화를 사용하여 SQL과 NoSQL 데이터베이스를 모두 지원하는 유연한 구조를 설계하였습니다.
- **프로필 기반 구성**: Spring Profiles을 사용하여 JPA와 MongoDB를 프로파일에 따라 동적으로 전환할 수 있습니다.
- 기술 블로그: https://code-l.tistory.com/37

### TestContainer를 이용한 Test코드 작성

<img width="70%" alt="" src="https://github.com/LuizyHub/exam-lab/assets/120697456/fb0fb611-6796-4c6d-814a-fb712dc42874"> 

- NoSQL 데이터베이스는 SpringBootTest와 @Transactional을 사용해도 롤백 처리가 되지 않기 때문에, 실제 데이터에 영향을 주지 않고 테스트를 수행하기 위해 Testcontainer가 필요했습니다.
- Testcontainer를 사용하면 데이터베이스와 같은 외부 서비스를 격리된 환경에서 실행할 수 있습니다.
- 이를 통해 정확하고 신뢰성 있는 테스트를 보장할 수 있습니다.
- 기술 블로그: https://developerjisu.tistory.com/106

### AI 문제 생성하기

<img width="70%" alt="" src="https://github.com/LuizyHub/exam-lab/assets/120697456/bf7b3a36-039f-4460-806d-874625bd10b9"> 

- **RAG를 사용한 시험 문제 생성**: 검색 증강 생성(RAG) 기술을 활용하여 사용자의 학습 자료에 특화된 시험 문제를 생성합니다.
- **프라이빗 또는 독점 데이터 소스 활용**: RAG는 프라이빗 또는 독점 데이터 소스의 정보를 보완하여 텍스트를 생성하는 기술입니다.
- **사용자 맞춤형 시험 문제**: 사용자의 학습 자료를 바탕으로 정확하고 관련성 높은 시험 문제를 자동으로 생성하여 제공합니다.

<br />

## 🧑🏻‍💻 팀원 소개 👩🏻‍💻

|                                                         박정제                                                          |                                                         김지수                                                         |                                                        윤성빈                                                        |                                                        김동우                                                        |
|:--------------------------------------------------------------------------------------------------------------------:|:-------------------------------------------------------------------------------------------------------------------:|:-----------------------------------------------------------------------------------------------------------------:|:-----------------------------------------------------------------------------------------------------------------:|
| <img src="https://github.com/LuizyHub/exam-lab/assets/120697456/75033304-87ad-4ca1-8952-e013392ca7b0" width="100" /> | <img src="https://github.com/LuizyHub/exam-lab/assets/120697456/889b4bae-4f43-4c3d-8814-ccba28ff71ca" width="80" /> | <img src="https://github.com/LuizyHub/exam-lab/assets/120697456/d3c9afd0-c401-464c-8ada-66a58c64933b" width="75"> | <img src="https://github.com/LuizyHub/exam-lab/assets/120697456/6c60dd4c-e986-4008-8de8-8ff38056e9a6" width="85"> |
|                                                        **BE**                                                        |                                                       **BE**                                                        |                                                      **FE**                                                       |                                                      **FE**                                                       |
|                                       [@LuizyHub](https://github.com/LuizyHub)                                       |                                     [@jisu-0305](https://github.com/jisu-0305)                                      |                                       [@binnary](https://github.com/binnay)                                       |                                         [@4BFC](https://github.com/4BFC)                                          |