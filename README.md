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
  - [도전 예시 1](#도전-예시-1)
  - [도전 예시 2](#도전-예시-2)
  - [도전 예시 3](#도전-예시-3)
  - [도전 예시 4](#도전-예시-4)
- [🔎 BE 기술적 도전](#-be-기술적-도전)
  - [테스트 코드로 swagger생성](#테스트-코드로-swagger생성)
  - [서버 성능에 맞춰 DB 구축](#서버-성능에-맞춰-db-구축)
  - [springdata 추상화를 이용한 2개의 DB코드 구현](#springdata-추상화를-이용한-2개의-db코드-구현)
  - [Testcontainer를 이용한 Test코드 작성](#testcontainer를-이용한-test코드-작성)
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

<!--<img alt='' src="" /> -->

### AI 문제 생성

> 최신 GPT-4o를 사용하여 학습 자료를 기반으로 10초 만에 5개의 문제를 자동 생성합니다. 빠르고 정확한 문제 생성으로 학습 효율을 높이세요.

<!--<img alt='' src="" /> -->

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
                <img src="https://img.shields.io/badge/IntelliJ IDEA-000000?logo=IntelliJ IDEA&logoColor=ffffff">
                <img src="https://img.shields.io/badge/Visual Studio Code-007ACC?logo=Visual Studio Code&logoColor=ffffff">
            </td>
        </tr>
        <tr>
            <td>
                  <p>언어</p>
            </td>
            <td>
                  <img src="https://img.shields.io/badge/java-000000?logo=openjdk&logoColor=004088"> 
                  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?logo=JavaScript&logoColor=000000">
            </td>
        </tr>
        <tr>
            <td>
                <p>데이터 베이스</p>
            </td>
            <td>
                <img src="https://img.shields.io/badge/Elasticsearch-5DACDF?logo=Elasticsearch&logoColor=ECD53F">
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

### 도전 예시 1

<!--
| 이미지 예시                                                                                                                      | 이미지 예시                                                                                                                 |
| ------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| <img alt="" src="" /> | <img alt="" src="" /> |
-->

### 도전 예시 2

<!--<img width="70%" alt="" src=""> -->

### 도전 예시 3

<!--
| 이미지 예시                                                                                                                      | 이미지 예시                                                                                                                 |
| ------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| <img alt="" src="" /> | <img alt="" src="" /> |
-->

### 도전 예시 4

<!--
| 이미지 예시                                                                                                                      | 이미지 예시                                                                                                                 |
| ------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| <img alt="" src="" /> | <img alt="" src="" /> |
-->

<br />

## 🔎 BE 기술적 도전

### 테스트 코드로 Swagger생성

<!--<img width="70%" alt="" src=""> -->

### 서버 성능에 맞춰 DB 구축

<!--<img width="70%" alt="" src=""> -->

### SpringData 추상화를 이용한 2개의 DB코드 구현

<!--<img width="70%" alt="" src=""> -->

### TestContainer를 이용한 Test코드 작성

<!--<img width="70%" alt="" src=""> -->

### AI 프롬프트 설정하기

<!--<img width="70%" alt="" src=""> -->

<br />

## 🧑🏻‍💻 팀원 소개 👩🏻‍💻

|                                       박정제                                       |                                                         김지수                                                          |                                      윤성빈                                      |                                      김동우                                      |
|:-------------------------------------------------------------------------------:|:--------------------------------------------------------------------------------------------------------------------:|:-----------------------------------------------------------------------------:|:-----------------------------------------------------------------------------:|
| <img src="https://avatars.githubusercontent.com/u/104267255?v=4" width="120" /> | <img src="https://github.com/LuizyHub/exam-lab/assets/120697456/889b4bae-4f43-4c3d-8814-ccba28ff71ca" width="120" /> | <img src="https://avatars.githubusercontent.com/u/125789787?v=4" width="120"> | <img src="https://avatars.githubusercontent.com/u/109135643?v=4" width="120"> |
|                                     **BE**                                      |                                                        **BE**                                                        |                                    **FE**                                     |                                    **FE**                                     |
|                    [@LuizyHub](https://github.com/LuizyHub)                     |                                      [@jisu-0305](https://github.com/jisu-0305)                                      |                     [@binnary](https://github.com/binnay)                     |                       [@4BFC](https://github.com/4BFC)                        |