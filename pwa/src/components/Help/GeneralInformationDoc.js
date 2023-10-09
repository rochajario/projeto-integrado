export const generalInformationDoc = [
  {
    document: true,
    label: "Cálculo de Índice de Massa Corporal",
    message: `
    <div align="center" style="margin-bottom: 10px">
      <h6 style="margin-bottom: 1px; margin-top:2px">Cálculo de Índice de Massa Corporal</h6>
    </div>

    <div style="text-align: center; margin-bottom: 10px">
      O <em>índice de massa corporal (IMC)</em> ou índice de massa corpórea
      é calculado dividindo o peso (em quilogramas) pela altura ao quadrado (em metros).
      Este é o índice recomendado pela OMS para avaliar o estado nutricional do indivíduo.
    </div>

    <div align="center">
      <strong>Fórmula Utilizada: </strong><em>IMC = peso/(altura²)</em>
    </div>

    <div align="center" style="margin: 10px">
      <strong>Classificação de IMC de acordo com a OMS</strong>
    </div>

    <div align="center" style="margin-bottom: 10px">
      <table>
        <thead>
          <tr>
            <th>IMC</th>
            <th>Classificação</th>
            <th>Obesidade (grau)</th>
          </tr>
        </thead>
        <tbody align="center">
          <tr>
            <td>Menor que 18,5</td>
            <td>Magreza</td>
            <td>-</td>
          </tr>
          <tr>
            <td>Entre 18,5 e 24,9</td>
            <td>Normal</td>
            <td>-</td>
          </tr>
          <tr>
            <td>Entre 25,0 e 29,9</td>
            <td>Sobrepeso</td>
            <td>I</td>
          </tr>
          <tr>
            <td>Entre 30,0 e 39,9</td>
            <td>Obesidade</td>
            <td>II</td>
          </tr>
          <tr>
            <td>Maior que 40,0</td>
            <td>Obesidade Grave</td>
            <td>III</td>
          </tr>
        </tbody>
      </table>
    </div>
    `,
  },
  {
    document: true,
    label: "Cálculo de peso ideal em crianças",
    message: `
      <div align="center" style="margin-bottom: 10px">
        <h6 style="margin-bottom:1px; margin-top:2px">Cálculo de peso ideal em crianças</h6><br/>
        <em>Aplicável: Crianças, Pré adolescentes (ambos sexos)</em>
      </div>

      <div style="text-align: center; margin-bottom: 10px">
        Como em adolescentes, não se deve usar nenhum indicador isolado para a avaliação de crianças.
        Outros indicadores antropométricos utilizados para avaliação do peso em crianças são as curvas de percentis.
        Fórmula para calcular o peso aproximado para crianças de 3 a 10 anos de idade.
      </div>

      <div style="text-align: center; margin-bottom: 10px">
      Por exemplo, Rafael é uma criança de 4 anos. Para calcular seu peso aproximado faça assim:
      <ul style="text-align: left">
        <li>P = I x 2 + 9</li>
        <li>P = 4 x 2 + 9</li>
        <li>P = 8 + 9</li>
        <li>P = 17 kg</li>
      </ul>
      O peso ideal aproximado de Rafael é 17 kg.
      </div>
    `,
  },
  {
    document: true,
    label: "Cálculo de peso ideal para adultos",
    message: `
      <div align="center" style="margin-bottom: 10px">
        <h6 style="margin-bottom:1px; margin-top:2px">Cálculo de peso ideal em adultos</h6><br/>
        <em>Aplicável: Adultos, Gestantes</em>
      </div>

      <div style="text-align: center; margin-bottom: 10px">
        <ul style="text-align: left">
          <li>IMC desejado (homens): (22 kg/m²)</li>
          <li>IMC desejado (mulheres): (21 kg/m²)</li>
        </ul>
        Por exemplo, Renata pesa 85 kg e tem 1,76 m de altura:
        <ul style="text-align: left">
          <li>IMC desejado x (Altura x Altura) </li>
          <li>PI = 21 x (1,76 x 1,76)</li>
          <li>PI = 21 x 3,09</li>
          <li>PI = 64,9 kg</li>
        </ul>
        O peso ideal para Renata é 64,9 kg.
      </div>
    `,
  },
  {
    document: true,
    label: "Cálculo de peso ideal em idosos",
    message: `
      <div align="center" style="margin-bottom: 10px">
        <h6 style="margin-bottom:1px; margin-top:2px">Cálculo de peso ideal em idosos</h6><br/>
        <em>Aplicável: Idosos</em>
      </div>

      <div style="text-align: center; margin-bottom: 10px">
        Utilize o percentil 50 para calcular o peso ideal em pessoas idosas.
        Os valores de percentil indicam a posição relativa do imc em relação a outras pessoas idosas com características semelhantes. A tabela mostra o IMC ideal para pessoas idosas.
      </div>

      <div align="center" style="margin-bottom: 10px">
      <table>
        <thead>
          <tr>
            <th>Idade</th>
            <th>Homens</th>
            <th>Mulheres (grau)</th>
          </tr>
        </thead>
        <tbody align="center">
          <tr>
            <td>65 a 69 (anos)</td>
            <td>24,3 kg/m²</td>
            <td>26,5 kg/m²</td>
          </tr>
          <tr>
            <td>70 a 74 (anos)</td>
            <td>25,1 kg/m²</td>
            <td>26,3 kg/m²</td>
          </tr>
          <tr>
            <td>75 a 79 (anos)</td>
            <td>23,9 kg/m²</td>
            <td>26,1 kg/m²</td>
          </tr>
          <tr>
            <td>80 a 84 (anos)</td>
            <td>23,1 kg/m²</td>
            <td>23,6 kg/m²</td>
          </tr>
          <tr>
            <td>85 (anos) ou mais</td>
            <td>23,1 kg/m²</td>
            <td>23,6 kg/m²</td>
          </tr>
        </tbody>
      </table>
      <em>Fonte: Burr e Phillips (1984)</em>
    </div>
    <div style="text-align: center; margin-bottom: 10px">
      Para obter o peso ideal utilize a seguinte fórmula:
      <ul style="text-align: left">
        <li>Percentil 50 x (altura (m) x altura (m))</li>
      </ul>
    </div>
    <div style="text-align: center; margin-bottom: 10px">
      Por exemplo, Marcelo tem 74 anos e 1,65 m de altura.
      Cálculo do peso ideal para Marcelo:
      <ul style="text-align: left">
        <li>PI = Percentil 50 x (Altura x Altura)</li>
        <li>PI = 25,1 x (1,65 x 1,65)</li>
        <li>PI = 25,1 x 2,72</li>
        <li>PI = 68,2 kg</li>
      </ul>
      O peso ideal para Marcelo é 64,9 kg.
    </div>
    `,
  },
  {
    document: true,
    label: "Cálculo de Taxa Metabólica Basal",
    message: `
      <div align="center" style="margin-bottom: 10px">
        <h6 style="margin-bottom:1px; margin-top:2px">Cálculo de Taxa Metabólica Basal</h6><br/>
      </div>

      <div align="center" style="margin-bottom: 10px">
        <strong>Formula Harris-Benedict:</strong> <em>P</em> é peso, <em>A</em> é altura em centímetros e <em>I</em> idade em anos. Essa equação é mais indicada para praticantes de atividade fisicas, enfermos ou feridos. Utilizar em pacientes ativos fisicamente que tem como objetivo aumento de peso e massa magra.
        <ul style="text-align: left">
          <li><strong>Masculino:</strong> 66 + (13,8 x P) + (5,0 x A) – (6,8 x I)</li>
          <li><strong>Feminino:</strong> 655 + (9,6 x P) + (1,9 x A) – (4,7 x I)</li>
        </ul>
      </div>

      <div align="center" style="margin-bottom: 10px">
        <strong>Formula Mifflin-St Jeor:</strong> <em>P</em> é peso, <em>A</em> é altura em centímetros e <em>I</em> idade em anos. É a mais precisa para estimar o GEB tanto em individuos eutróficos, como em sobrepeso e obesos. Utilizar em pacientes com objetivo de emagrecimento.
        <ul style="text-align: left">
          <li><strong>Masculino:</strong> (10 x P) + (6,25 x A) – (5,0 x I) – 161</li>
          <li><strong>Feminino:</strong> (10 x P) + (6,25 x A) – (5,0 x I) + 5</li>
        </ul>
      </div>

      <div align="center" style="margin-bottom: 10px">
        <strong>Formula Cunningham e Tinsley:</strong> <em>P</em> é peso, <em>MLG</em> massa livre de gordura.
        <ul style="text-align: left">
          <li><strong>Cunningham ( MLG ):</strong> (22 x MLG) + 500</li>
          <li><strong>Tinsley ( MLG ):</strong> (10 x P) + (6,25 x A) – (5,0 x I) + 5</li>
          <li><strong>Tinsley ( P ):</strong> (25,9 x MLG) + 284</li>
        </ul>
      </div>
    `,
  },
];
