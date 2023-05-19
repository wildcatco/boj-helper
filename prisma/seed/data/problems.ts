import dedent from 'ts-dedent';

export const problems: {
  id: number;
  title: string;
  descriptionHtml: string;
  inputHtml: string;
  outputHtml: string;
  limitHtml: string | null;
  examples: { input: string; output: string }[];
  associations?: number[];
}[] = [
  {
    id: 1000,
    title: 'A+B',
    descriptionHtml:
      '<p>두 정수 A와 B를 입력받은 다음,&nbsp;A+B를 출력하는 프로그램을 작성하시오.</p>',
    inputHtml: '<p>첫째 줄에 A와 B가 주어진다. (0 &lt; A, B &lt; 10)</p>',
    outputHtml: '<p>첫째 줄에 A+B를 출력한다.</p>',
    limitHtml: null,
    examples: [
      {
        input: '1 2',
        output: '3',
      },
    ],
    associations: [
      1001, 1008, 2558, 10950, 10951, 10952, 10953, 10998, 11021, 11022, 15740,
      15792,
    ],
  },
  {
    id: 1001,
    title: 'A-B',
    descriptionHtml:
      '<p>두 정수 A와 B를 입력받은 다음, A-B를 출력하는 프로그램을 작성하시오.</p>',
    inputHtml: '<p>첫째 줄에 A와 B가 주어진다. (0 &lt; A, B &lt; 10)</p>',
    outputHtml: '<p>첫째 줄에 A-B를 출력한다.</p>',
    limitHtml: null,
    examples: [
      {
        input: '3 2',
        output: '1',
      },
    ],
    associations: [
      1000, 1008, 2558, 10950, 10951, 10952, 10953, 10998, 11021, 11022, 15740,
      15792,
    ],
  },
  {
    id: 9498,
    title: '시험 성적',
    descriptionHtml: dedent(
      `<p>시험 점수를 입력받아 90 ~ 100점은 A, 80 ~ 89점은 B, 70 ~ 79점은 C, 60 ~ 69점은 D, 나머지 점수는 F를 출력하는 프로그램을 작성하시오.</p>`
    ),
    inputHtml: dedent(
      `<p>첫째 줄에 시험 점수가 주어진다. 시험 점수는 0보다 크거나 같고, 100보다 작거나 같은 정수이다.</p>`
    ),
    outputHtml: dedent(`<p>시험 성적을 출력한다.</p>`),
    limitHtml: null,
    examples: [
      {
        input: '100',
        output: 'A',
      },
    ],
  },
  {
    id: 14681,
    title: '사분면 고르기',
    descriptionHtml:
      dedent(`<p>흔한 수학 문제 중 하나는 주어진 점이 어느 사분면에 속하는지 알아내는 것이다. 사분면은 아래 그림처럼 1부터 4까지 번호를 갖는다. "Quadrant n"은 "제n사분면"이라는 뜻이다.</p>

      <p style="text-align: center;"><img alt="" src="https://onlinejudgeimages.s3-ap-northeast-1.amazonaws.com/problem/14681/1.png" style="width: 276px; height: 200px;"></p>
      
      <p>예를 들어, 좌표가 (12, 5)인 점 A는 x좌표와 y좌표가 모두 양수이므로 제1사분면에 속한다. 점 B는 x좌표가 음수이고 y좌표가 양수이므로 제2사분면에 속한다.</p>
      
      <p>점의 좌표를 입력받아 그 점이 어느 사분면에 속하는지 알아내는 프로그램을 작성하시오. 단, x좌표와 y좌표는 모두 양수나 음수라고 가정한다.</p>`),
    inputHtml: dedent(
      `<p>첫 줄에는 정수 x가 주어진다. (−1000 ≤ x ≤ 1000; x ≠ 0) 다음 줄에는 정수 y가 주어진다. (−1000 ≤ y ≤ 1000; y ≠ 0)</p>`
    ),
    outputHtml: dedent(
      `<p>점 (x, y)의 사분면 번호(1, 2, 3, 4 중 하나)를 출력한다.</p>`
    ),
    limitHtml: null,
    examples: [
      {
        input: '12 5',
        output: '1',
      },
      {
        input: '9 -13',
        output: '4',
      },
    ],
  },
  {
    id: 1260,
    title: 'DFS와 BFS',
    descriptionHtml: dedent(
      `<p>그래프를 DFS로 탐색한 결과와 BFS로 탐색한 결과를 출력하는 프로그램을 작성하시오. 단, 방문할 수 있는 정점이 여러 개인 경우에는 정점 번호가 작은 것을 먼저 방문하고, 더 이상 방문할 수 있는 점이 없는 경우 종료한다.&nbsp;정점 번호는 1번부터 N번까지이다.</p>`
    ),
    inputHtml: dedent(
      `<p>첫째 줄에 정점의 개수 N(1 ≤ N ≤ 1,000), 간선의 개수 M(1 ≤ M ≤ 10,000), 탐색을 시작할 정점의 번호 V가 주어진다. 다음 M개의 줄에는 간선이 연결하는 두 정점의 번호가 주어진다. 어떤 두 정점 사이에 여러 개의 간선이 있을 수 있다. 입력으로 주어지는 간선은 양방향이다.</p>`
    ),
    outputHtml: dedent(
      `<p>첫째 줄에 DFS를 수행한 결과를, 그 다음 줄에는 BFS를 수행한 결과를 출력한다. V부터 방문된 점을 순서대로 출력하면 된다.</p>`
    ),
    limitHtml: null,
    examples: [
      {
        input: dedent(`4 5 1
        1 2
        1 3
        1 4
        2 4
        3 4`),
        output: dedent(`1 2 4 3
        1 2 3 4`),
      },
      {
        input: dedent(`5 5 3
        5 4
        5 2
        1 2
        3 4
        3 1`),
        output: dedent(`3 1 2 5 4
        3 1 4 2 5`),
      },
      {
        input: dedent(`1000 1 1000
        999 1000`),
        output: dedent(`1000 999
        1000 999`),
      },
    ],
  },
  {
    id: 2468,
    title: '안전 영역',
    descriptionHtml: dedent(
      `<p>재난방재청에서는 많은 비가 내리는 장마철에 대비해서 다음과 같은 일을 계획하고 있다. 먼저 어떤 지역의 높이 정보를 파악한다. 그 다음에 그 지역에 많은 비가 내렸을 때 물에 잠기지 않는 안전한 영역이 최대로 몇 개가 만들어 지는 지를 조사하려고 한다. 이때, 문제를 간단하게 하기 위하여, 장마철에 내리는 비의 양에 따라 일정한 높이 이하의 모든 지점은 물에 잠긴다고 가정한다.</p>

      <p>어떤 지역의 높이 정보는 행과 열의 크기가 각각 N인 2차원 배열 형태로 주어지며 배열의 각 원소는 해당 지점의 높이를 표시하는 자연수이다. 예를 들어, 다음은 N=5인 지역의 높이 정보이다.</p>
      
      <table class="table table-bordered table-center-20 td-center">
        <tbody>
          <tr>
            <td>6</td>
            <td>8</td>
            <td>2</td>
            <td>6</td>
            <td>2</td>
          </tr>
          <tr>
            <td>3</td>
            <td>2</td>
            <td>3</td>
            <td>4</td>
            <td>6</td>
          </tr>
          <tr>
            <td>6</td>
            <td>7</td>
            <td>3</td>
            <td>3</td>
            <td>2</td>
          </tr>
          <tr>
            <td>7</td>
            <td>2</td>
            <td>5</td>
            <td>3</td>
            <td>6</td>
          </tr>
          <tr>
            <td>8</td>
            <td>9</td>
            <td>5</td>
            <td>2</td>
            <td>7</td>
          </tr>
        </tbody>
      </table>
      
      <p>이제 위와 같은 지역에 많은 비가 내려서 높이가 4 이하인 모든 지점이 물에 잠겼다고 하자. 이 경우에 물에 잠기는 지점을 회색으로 표시하면 다음과 같다.&nbsp;</p>
      
      <table class="table table-bordered table-center-20 td-center">
        <tbody>
          <tr>
            <td>6</td>
            <td>8</td>
            <td class="bg-2468">2</td>
            <td>6</td>
            <td class="bg-2468">2</td>
          </tr>
          <tr>
            <td class="bg-2468">3</td>
            <td class="bg-2468">2</td>
            <td class="bg-2468">3</td>
            <td class="bg-2468">4</td>
            <td>6</td>
          </tr>
          <tr>
            <td>6</td>
            <td>7</td>
            <td class="bg-2468">3</td>
            <td class="bg-2468">3</td>
            <td class="bg-2468">2</td>
          </tr>
          <tr>
            <td>7</td>
            <td class="bg-2468">2</td>
            <td>5</td>
            <td class="bg-2468">3</td>
            <td>6</td>
          </tr>
          <tr>
            <td>8</td>
            <td>9</td>
            <td>5</td>
            <td class="bg-2468">2</td>
            <td>7</td>
          </tr>
        </tbody>
      </table>
      
      <p>물에 잠기지 않는 안전한 영역이라 함은 물에 잠기지 않는 지점들이 위, 아래, 오른쪽 혹은 왼쪽으로 인접해 있으며 그 크기가 최대인 영역을 말한다. 위의 경우에서 물에 잠기지 않는 안전한 영역은 5개가 된다(꼭짓점으로만 붙어 있는 두 지점은 인접하지 않는다고 취급한다).&nbsp;</p>
      
      <p>또한 위와 같은 지역에서 높이가 6이하인 지점을 모두 잠기게 만드는 많은 비가 내리면 물에 잠기지 않는 안전한 영역은 아래 그림에서와 같이 네 개가 됨을 확인할 수 있다.&nbsp;</p>
      
      <table class="table table-bordered table-center-20 td-center">
        <tbody>
          <tr>
            <td class="bg-2468">6</td>
            <td>8</td>
            <td class="bg-2468">2</td>
            <td class="bg-2468">6</td>
            <td class="bg-2468">2</td>
          </tr>
          <tr>
            <td class="bg-2468">3</td>
            <td class="bg-2468">2</td>
            <td class="bg-2468">3</td>
            <td class="bg-2468">4</td>
            <td class="bg-2468">6</td>
          </tr>
          <tr>
            <td class="bg-2468">6</td>
            <td>7</td>
            <td class="bg-2468">3</td>
            <td class="bg-2468">3</td>
            <td class="bg-2468">2</td>
          </tr>
          <tr>
            <td>7</td>
            <td class="bg-2468">2</td>
            <td class="bg-2468">5</td>
            <td class="bg-2468">3</td>
            <td class="bg-2468">6</td>
          </tr>
          <tr>
            <td>8</td>
            <td>9</td>
            <td class="bg-2468">5</td>
            <td class="bg-2468">2</td>
            <td>7</td>
          </tr>
        </tbody>
      </table>
      
      <p>이와 같이 장마철에 내리는 비의 양에 따라서 물에 잠기지 않는 안전한 영역의 개수는 다르게 된다. 위의 예와 같은 지역에서 내리는 비의 양에 따른 모든 경우를 다 조사해 보면 물에 잠기지 않는 안전한 영역의 개수 중에서 최대인 경우는 5임을 알 수 있다.&nbsp;</p>
      
      <p>어떤 지역의 높이 정보가 주어졌을 때, 장마철에 물에 잠기지 않는 안전한 영역의 최대 개수를 계산하는 프로그램을 작성하시오.&nbsp;</p>`
    ),
    inputHtml: dedent(
      `<p>첫째 줄에는 어떤 지역을 나타내는 2차원 배열의 행과 열의 개수를 나타내는 수 N이 입력된다. N은 2 이상 100 이하의 정수이다. 둘째 줄부터 N개의 각 줄에는 2차원 배열의 첫 번째 행부터 N번째 행까지 순서대로 한 행씩 높이 정보가 입력된다. 각 줄에는 각 행의 첫 번째 열부터 N번째 열까지 N개의 높이 정보를 나타내는 자연수가 빈 칸을 사이에 두고 입력된다. 높이는 1이상 100 이하의 정수이다.</p>`
    ),
    outputHtml: dedent(
      `<p>첫째 줄에 장마철에 물에 잠기지 않는 안전한 영역의 최대 개수를 출력한다.</p>`
    ),
    limitHtml: null,
    examples: [
      {
        input: dedent(`5
        6 8 2 6 2
        3 2 3 4 6
        6 7 3 3 2
        7 2 5 3 6
        8 9 5 2 7`),
        output: dedent(`5`),
      },
      {
        input: dedent(`7
        9 9 9 9 9 9 9
        9 2 1 2 1 2 9
        9 1 8 7 8 1 9
        9 2 7 9 7 2 9
        9 1 8 7 8 1 9
        9 2 1 2 1 2 9
        9 9 9 9 9 9 9`),
        output: dedent(`6`),
      },
    ],
  },
  {
    id: 1240,
    title: '노드사이의 거리',
    descriptionHtml: dedent(
      `<p>N(2≤N≤1,000)개의 노드로 이루어진 트리가 주어지고 M(M≤1,000)개의 두 노드 쌍을 입력받을 때 두 노드 사이의 거리를 출력하라.</p>`
    ),
    inputHtml: dedent(
      `<p>첫째 줄에 노드의 개수 N이 입력되고 다음 N-1개의 줄에 트리 상에 연결된 두 점과 거리(10,000 이하의 정수)를 입력받는다. 그 다음 줄에는 거리를 알고 싶은 M개의 노드 쌍이 한 줄에 한 쌍씩 입력된다.</p>`
    ),
    outputHtml: dedent(
      `<p>M개의 줄에 차례대로 입력받은 두 노드 사이의 거리를 출력한다.</p>`
    ),
    limitHtml: null,
    examples: [
      {
        input: dedent(`4 2
        2 1 2
        4 3 2
        1 4 3
        1 2
        3 2`),
        output: dedent(`2
        7`),
      },
    ],
  },
  {
    id: 1920,
    title: '수 찾기',
    descriptionHtml: dedent(
      `<p>N개의 정수 A[1], A[2], …, A[N]이 주어져 있을 때, 이 안에 X라는 정수가 존재하는지 알아내는 프로그램을 작성하시오.</p>`
    ),
    inputHtml: dedent(
      `<p>첫째 줄에 자연수 N(1 ≤ N ≤ 100,000)이 주어진다. 다음 줄에는 N개의 정수 A[1], A[2], …, A[N]이 주어진다. 다음 줄에는 M(1 ≤ M ≤ 100,000)이 주어진다. 다음 줄에는 M개의 수들이 주어지는데, 이 수들이 A안에 존재하는지 알아내면 된다. 모든 정수의 범위는 -2<sup>31</sup> 보다 크거나 같고 2<sup>31</sup>보다 작다.</p>`
    ),
    outputHtml: dedent(
      `<p>M개의 줄에 답을 출력한다. 존재하면 1을, 존재하지 않으면 0을 출력한다.</p>`
    ),
    limitHtml: null,
    examples: [
      {
        input: dedent(`5
        4 1 5 2 3
        5
        1 3 7 9 5`),
        output: dedent(`1
        1
        0
        0
        1`),
      },
    ],
  },
  {
    id: 1927,
    title: '최소 힙',
    descriptionHtml:
      dedent(`<p>널리 잘 알려진 자료구조 중 최소 힙이 있다. 최소 힙을 이용하여 다음과 같은 연산을 지원하는 프로그램을 작성하시오.</p>

    <ol>
      <li>배열에 자연수 x를 넣는다.</li>
      <li>배열에서 가장 작은 값을 출력하고, 그 값을 배열에서 제거한다.</li>
    </ol>
    
    <p>프로그램은 처음에 비어있는 배열에서 시작하게 된다.</p>`),
    inputHtml: dedent(
      `<p>첫째 줄에 연산의 개수 N(1 ≤ N ≤ 100,000)이 주어진다. 다음 N개의 줄에는 연산에 대한 정보를 나타내는 정수 x가 주어진다. 만약 x가 자연수라면 배열에 x라는 값을 넣는(추가하는) 연산이고, x가 0이라면 배열에서 가장 작은 값을 출력하고 그 값을 배열에서 제거하는 경우이다. x는 2<sup>31</sup>보다 작은 자연수 또는 0이고, 음의 정수는 입력으로 주어지지 않는다.</p>`
    ),
    outputHtml: dedent(
      `<p>입력에서 0이 주어진 횟수만큼 답을 출력한다. 만약 배열이 비어 있는 경우인데 가장 작은 값을 출력하라고 한 경우에는 0을 출력하면 된다.</p>`
    ),
    limitHtml: null,
    examples: [
      {
        input: dedent(`9
        0
        12345678
        1
        2
        0
        0
        0
        0
        32`),
        output: dedent(`0
        1
        2
        12345678
        0`),
      },
    ],
    associations: [11279, 11286],
  },
  {
    id: 15903,
    title: '카드 합체 놀이',
    descriptionHtml:
      dedent(`<p>석환이는 아기다. 아기 석환이는 자연수가 쓰여져있는 카드를 갖고 다양한 놀이를 하며 노는 것을 좋아한다. 오늘 아기 석환이는 무슨 놀이를 하고 있을까? 바로 카드 합체 놀이이다!</p>

    <p>아기 석환이는 자연수가 쓰여진 카드를 n장 갖고 있다. 처음에 i번 카드엔 a<sub>i</sub>가 쓰여있다. 카드 합체 놀이는 이&nbsp;카드들을 합체하며 노는 놀이이다. 카드 합체는 다음과 같은 과정으로 이루어진다.</p>
    
    <ol>
      <li>x번 카드와 y번 카드를 골라 그 두 장에 쓰여진 수를 더한 값을 계산한다. (x ≠ y)</li>
      <li>계산한 값을 x번 카드와 y번 카드 두 장 모두에 덮어 쓴다.</li>
    </ol>
    
    <p>이 카드 합체를 총 m번 하면 놀이가 끝난다. m번의 합체를 모두 끝낸 뒤, n장의 카드에 쓰여있는 수를 모두 더한 값이 이 놀이의 점수가 된다. 이 점수를 가장 작게 만드는 것이 놀이의 목표이다.</p>
    
    <p>아기 석환이는 수학을 좋아하긴 하지만, 아직 아기이기 때문에 점수를 얼마나 작게 만들 수 있는지를 알 수는 없었다(어른 석환이는 당연히 쉽게 알 수 있다). 그래서 문제 해결 능력이 뛰어난 여러분에게 도움을 요청했다. 만들 수 있는 가장 작은 점수를 계산하는 프로그램을 만들어보자.</p>`),
    inputHtml:
      dedent(`<p>첫 번째 줄에 카드의 개수를 나타내는 수 n(2 ≤ n ≤ 1,000)과 카드 합체를 몇 번 하는지를 나타내는 수 m(0 ≤ m ≤ 15×n)이 주어진다.</p>

    <p>두 번째 줄에 맨 처음 카드의 상태를 나타내는 n개의 자연수 a<sub>1</sub>, a<sub>2</sub>, …, a<sub>n</sub>이 공백으로 구분되어 주어진다. (1 ≤ a<sub>i</sub> ≤ 1,000,000)</p>`),
    outputHtml: dedent(
      `<p>첫 번째 줄에 만들 수 있는 가장 작은 점수를 출력한다.</p>`
    ),
    limitHtml: null,
    examples: [
      {
        input: dedent(`3 1
        3 2 6`),
        output: dedent(`16`),
      },
      {
        input: dedent(`4 2
        4 2 3 1`),
        output: dedent(`19`),
      },
    ],
  },
  {
    id: 11000,
    title: '강의실 배정',
    descriptionHtml:
      dedent(`<p>수강신청의 마스터 김종혜 선생님에게 새로운 과제가 주어졌다.&nbsp;</p>

    <p>김종혜 선생님한테는 S<sub>i</sub>에 시작해서 T<sub>i</sub>에 끝나는 N개의 수업이 주어지는데, 최소의 강의실을 사용해서 모든 수업을 가능하게 해야 한다.&nbsp;</p>
    
    <p>참고로, 수업이 끝난 직후에 다음 수업을 시작할 수 있다. (즉, T<sub>i</sub> ≤ S<sub>j</sub> 일 경우 i 수업과 j 수업은 같이 들을 수 있다.)</p>
    
    <p>수강신청 대충한 게 찔리면, 선생님을 도와드리자!</p>`),
    inputHtml: dedent(`<p>첫 번째 줄에 N이 주어진다. (1 ≤ N ≤ 200,000)</p>

    <p>이후 N개의 줄에 S<sub>i</sub>, T<sub>i</sub>가 주어진다. (0 ≤ S<sub>i</sub> &lt; T<sub>i</sub>&nbsp;≤&nbsp;10<sup>9</sup>)</p>`),
    outputHtml: dedent(`<p>강의실의 개수를 출력하라.</p>`),
    limitHtml: null,
    examples: [
      {
        input: dedent(`3
        1 3
        2 4
        3 5`),
        output: dedent(`2`),
      },
    ],
  },
  {
    id: 2447,
    title: '별 찍기 - 10',
    descriptionHtml:
      dedent(`<p>재귀적인 패턴으로 별을 찍어 보자. N이 3의 거듭제곱(3, 9, 27, ...)이라고 할 때, 크기 N의 패턴은 N×N 정사각형 모양이다.</p>

      <p>크기 3의 패턴은 가운데에 공백이 있고, 가운데를 제외한 모든 칸에 별이 하나씩 있는 패턴이다.</p>
      
      <pre>***
      * *
      ***</pre>
      
      <p>N이 3보다 클 경우, 크기 N의 패턴은 공백으로 채워진 가운데의 (N/3)×(N/3) 정사각형을 크기 N/3의 패턴으로 둘러싼 형태이다. 예를 들어 크기 27의 패턴은 예제 출력 1과 같다.</p>`),
    inputHtml: dedent(
      `<p>첫째 줄에 N이 주어진다. N은 3의 거듭제곱이다. 즉 어떤 정수 k에 대해 N=3<sup>k</sup>이며, 이때 1 ≤ k &lt; 8이다.</p>`
    ),
    outputHtml: dedent(`<p>첫째 줄부터 N번째 줄까지 별을 출력한다.</p>`),
    limitHtml: null,
    examples: [
      {
        input: dedent(`27`),
        output: dedent(`***************************
        * ** ** ** ** ** ** ** ** *
        ***************************
        ***   ******   ******   ***
        * *   * ** *   * ** *   * *
        ***   ******   ******   ***
        ***************************
        * ** ** ** ** ** ** ** ** *
        ***************************
        *********         *********
        * ** ** *         * ** ** *
        *********         *********
        ***   ***         ***   ***
        * *   * *         * *   * *
        ***   ***         ***   ***
        *********         *********
        * ** ** *         * ** ** *
        *********         *********
        ***************************
        * ** ** ** ** ** ** ** ** *
        ***************************
        ***   ******   ******   ***
        * *   * ** *   * ** *   * *
        ***   ******   ******   ***
        ***************************
        * ** ** ** ** ** ** ** ** *
        ***************************`),
      },
    ],
  },
  {
    id: 1992,
    title: '쿼드트리',
    descriptionHtml:
      dedent(`<p>흑백 영상을 압축하여 표현하는 데이터 구조로 쿼드 트리(Quad Tree)라는 방법이 있다. 흰 점을 나타내는 0과 검은 점을 나타내는 1로만 이루어진 영상(2차원 배열)에서 같은 숫자의 점들이 한 곳에 많이 몰려있으면, 쿼드 트리에서는 이를 압축하여 간단히 표현할 수 있다.</p>

      <p>주어진 영상이 모두 0으로만 되어 있으면 압축 결과는 "0"이 되고, 모두 1로만 되어 있으면 압축 결과는 "1"이 된다. 만약 0과 1이 섞여 있으면 전체를 한 번에 나타내지를 못하고, 왼쪽 위, 오른쪽 위, 왼쪽 아래, 오른쪽 아래, 이렇게 4개의 영상으로 나누어 압축하게 되며, 이 4개의 영역을 압축한 결과를 차례대로 괄호 안에 묶어서 표현한다</p>
      
      <p style="text-align: center;"><img alt="" height="186" src="https://www.acmicpc.net/JudgeOnline/upload/201007/qq.png" width="408"></p>
      
      <p>위 그림에서 왼쪽의 영상은 오른쪽의 배열과 같이 숫자로 주어지며, 이 영상을 쿼드 트리 구조를 이용하여 압축하면 "<code>(0(0011)(0(0111)01)1)</code>"로 표현된다.  N ×N 크기의 영상이 주어질 때, 이 영상을 압축한 결과를 출력하는 프로그램을 작성하시오.</p>`),
    inputHtml: dedent(
      `<p>첫째 줄에는 영상의 크기를 나타내는 숫자 N 이 주어진다. N 은 언제나 2의 제곱수로 주어지며, 1 ≤ N ≤ 64의 범위를 가진다. 두 번째 줄부터는 길이 N의 문자열이 N개 들어온다. 각 문자열은 0 또는 1의 숫자로 이루어져 있으며, 영상의 각 점들을 나타낸다.</p>`
    ),
    outputHtml: dedent(`<p>영상을 압축한 결과를 출력한다.</p>`),
    limitHtml: null,
    examples: [
      {
        input: dedent(`8
        11110000
        11110000
        00011100
        00011100
        11110000
        11110000
        11110011
        11110011`),
        output: dedent(`((110(0101))(0010)1(0001))`),
      },
    ],
  },
  {
    id: 10830,
    title: '행렬 제곱',
    descriptionHtml: dedent(
      `<p>크기가 N*N인 행렬 A가 주어진다. 이때, A의 B제곱을 구하는 프로그램을 작성하시오. 수가 매우 커질 수 있으니, A^B의 각 원소를 1,000으로 나눈 나머지를 출력한다.</p>`
    ),
    inputHtml:
      dedent(`<p>첫째 줄에 행렬의 크기 N과 B가 주어진다. (2&nbsp;≤ N ≤ &nbsp;5, 1 ≤ B ≤ 100,000,000,000)</p>

    <p>둘째 줄부터 N개의 줄에 행렬의 각 원소가&nbsp;주어진다. 행렬의 각 원소는 1,000보다 작거나 같은&nbsp;자연수 또는 0이다.</p>`),
    outputHtml: dedent(
      `<p>첫째 줄부터 N개의 줄에 걸쳐 행렬 A를 B제곱한 결과를 출력한다.</p>`
    ),
    limitHtml: null,
    examples: [
      {
        input: dedent(`2 5
        1 2
        3 4`),
        output: dedent(`69 558
        337 406`),
      },
      {
        input: dedent(`3 3
        1 2 3
        4 5 6
        7 8 9`),
        output: dedent(`468 576 684
        62 305 548
        656 34 412`),
      },
      {
        input: dedent(`5 10
        1 0 0 0 1
        1 0 0 0 1
        1 0 0 0 1
        1 0 0 0 1
        1 0 0 0 1`),
        output: dedent(`512 0 0 0 512
        512 0 0 0 512
        512 0 0 0 512
        512 0 0 0 512
        512 0 0 0 512`),
      },
    ],
  },
];
