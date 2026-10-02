import { useMemo, useState } from 'react'
import { books, glossary, movements, setups, tips } from './data.js'

const sections = [
  ['inicio','Inicio'],['terminal','Terminal MT5'],['grafico','Gráficos'],['movimientos','Movimientos'],
  ['setups','Jugadas / setups'],['operar','Abrir operación'],['gestionar','Gestionar y cerrar'],
  ['riesgo','Riesgo'],['glosario','Glosario'],['biblioteca','Biblioteca']
]

function Title({kicker,children,text}) {
  return <div className="section-title"><span>{kicker}</span><h2>{children}</h2>{text&&<p>{text}</p>}</div>
}

function TerminalMock(){
  return <div className="terminal">
    <div className="mt-menu">Archivo　 Ver　 Insertar　 Gráficos　 Herramientas　 Ventana　 Ayuda</div>
    <div className="mt-tools"><b>＋ Nueva Orden</b><span>M1</span><b>M5</b><span>M15</span><span>M30</span><span>H1</span><span>H4</span><span>D1</span></div>
    <div className="mt-body">
      <div className="watch"><b>① Observación del mercado</b><small>Símbolo　　　 Bid　　 Ask</small>
        {['XAUUSDm　4181.92　4182.06','EURUSDm　1.17274　1.17285','GBPUSDm　1.34181　1.34195','USDJPYm　147.602　147.617'].map(x=><i key={x}>{x}</i>)}
        <b className="nav">Navegador</b><small>▾ Cuentas<br/>　▸ Indicadores<br/>　▸ Asesores expertos</small>
      </div>
      <div className="chart"><b>② XAUUSDm,M5 — Gold vs US Dollar</b><div className="quotes"><span>SELL<br/><strong>4181.92</strong></span><span>BUY<br/><strong>4182.06</strong></span></div><div className="gridchart"><div className="zig">╲╱╲╱╲╱╲╱╲╱</div><em>③ cada vela = 5 minutos</em></div></div>
    </div>
    <div className="trade"><b>⑤ Operaciones</b>　 Exposición　 Historial　 Noticias<br/><small>Balance: <b>10 000.00</b>　 Patrimonio: <b>9 984.30</b>　 Margen: <b>132.50</b>　 Margen libre: <b>9 851.80</b></small></div>
  </div>
}

function RiskTool(){
  const [balance,setBalance]=useState(1000),[risk,setRisk]=useState(1),[entry,setEntry]=useState(4182),[sl,setSl]=useState(4177),[tp,setTp]=useState(4192)
  const cash=balance*risk/100, a=Math.abs(entry-sl), b=Math.abs(tp-entry), rr=a?b/a:0
  return <div className="calculator"><div><b>Simulador educativo de riesgo</b><span>No calcula lotaje real</span></div>
    <div className="inputs">
      <label>Balance $<input type="number" value={balance} onChange={e=>setBalance(+e.target.value)}/></label>
      <label>Riesgo %<input type="number" step=".1" value={risk} onChange={e=>setRisk(+e.target.value)}/></label>
      <label>Entrada<input type="number" value={entry} onChange={e=>setEntry(+e.target.value)}/></label>
      <label>Stop<input type="number" value={sl} onChange={e=>setSl(+e.target.value)}/></label>
      <label>Objetivo<input type="number" value={tp} onChange={e=>setTp(+e.target.value)}/></label>
    </div>
    <div className="results"><div><small>Riesgo monetario</small><b>${cash.toFixed(2)}</b></div><div><small>Distancia SL</small><b>{a.toFixed(2)}</b></div><div><small>Distancia TP</small><b>{b.toFixed(2)}</b></div><div><small>R:R teórico</small><b>1 : {rr.toFixed(2)}</b></div></div>
    <p>El lotaje real depende de tamaño de contrato, tick size/value, divisa e instrumento. Verificá las especificaciones en MT5 o la calculadora de Exness.</p>
  </div>
}

function App(){
  const [q,setQ]=useState(''),[cat,setCat]=useState('Todos')
  const cats=useMemo(()=>['Todos',...new Set(glossary.map(x=>x.category))],[])
  const terms=glossary.filter(x=>(cat==='Todos'||x.category===cat)&&(`${x.term} ${x.short} ${x.detail}`).toLowerCase().includes(q.toLowerCase()))
  return <div className="layout">
    <aside><a className="logo" href="#inicio"><i>↗</i><div><b>TRADER</b><small>GUIDE</small></div></a><nav>{sections.map(([id,t],i)=><a href={'#'+id} key={id}><span>{String(i).padStart(2,'0')}</span>{t}</a>)}</nav><div className="mode"><i></i>Modo educativo</div></aside>
    <main>
      <section id="inicio" className="hero">
        <div><span className="kicker">EXNESS + METATRADER 5 · VISTA TRADER</span><h1>Entendé la pantalla.<br/><em>Decidí vos la operación.</em></h1><p>Guía completa para leer el gráfico, reconocer movimientos, estructurar una jugada, definir riesgo, abrir una orden, gestionarla y cerrarla. Sin señales ni “comprá ahora”.</p><div className="hero-buttons"><a href="#terminal">Empezar recorrido →</a><a href="#glosario">Abrir glosario</a></div></div>
        <div className="hero-art"><div className="orb">XAU<br/><b>USD</b></div><div className="float f1">R:R <b>1 : 2</b><small>ejemplo</small></div><div className="float f2">REGLA #1<b>Definí invalidación</b><small>antes de entrar</small></div></div>
      </section>

      <div className="stats"><div><small>Ruta</small><b>9 módulos</b><span>flujo completo</span></div><div><small>Glosario</small><b>{glossary.length}+ términos</b><span>buscables</span></div><div><small>Movimientos</small><b>{movements.length} claves</b><span>con errores comunes</span></div><div><small>Enfoque</small><b>100% educativo</b><span>decisión del usuario</span></div></div>

      <section id="terminal"><Title kicker="01 · TERMINAL" text="La vista que compartiste es MetaTrader 5 Desktop conectado a una cuenta de Exness. Estas son las zonas que más vas a usar como trader.">Conocé la pantalla antes de tocar BUY o SELL</Title><TerminalMock/>
        <div className="cards two">{[
          ['① Observación del mercado','Instrumentos y precios Bid/Ask. Doble clic o clic derecho puede abrir Nueva Orden.'],
          ['② Gráfico','Precio, velas, estructura, temporalidad y tus objetos/indicadores.'],
          ['③ Timeframes','M1, M5, M15, H1… indican cuánto tiempo resume cada vela.'],
          ['④ Nueva Orden','Símbolo, volumen, SL, TP, tipo de orden y ejecución. Atajo habitual: F9.'],
          ['⑤ Operaciones','Posiciones abiertas y órdenes pendientes. Desde aquí gestionás y cerrás.'],
          ['⑥ Balance / Equity','Balance excluye P/L flotante; patrimonio/equity sí lo incorpora.']
        ].map(x=><article key={x[0]}><h3>{x[0]}</h3><p>{x[1]}</p></article>)}</div>
      </section>

      <section id="grafico"><Title kicker="02 · GRÁFICOS" text="Una vela es información, no una señal. Primero entendé dónde está el precio y qué estructura está construyendo.">Cómo leer velas y contexto</Title>
        <div className="cards three"><article><div className="candle"><i></i><b></b><i></i></div><h3>Anatomía</h3><p>Una vela resume apertura, cierre, máximo y mínimo del periodo. Cuerpo = apertura/cierre; mechas = extremos.</p></article><article><h3>XAUUSDm,M5</h3><p><b>XAU</b> = oro · <b>USD</b> = dólar · <b>m</b> = sufijo del símbolo · <b>M5</b> = 5 minutos por vela.</p></article><article><h3>Orden de lectura</h3><p>1. Ubicación → 2. Estructura → 3. Impulso/volatilidad → 4. Confirmación → 5. Invalidación.</p></article></div>
        <div className="principle"><small>PRINCIPIO ÚTIL</small><b>“El patrón importa menos cuando ignorás dónde aparece.”</b><p>Nison y Murphy insisten en contexto: tendencia, zonas y estructura antes de interpretar una figura aislada.</p></div>
      </section>

      <section id="movimientos"><Title kicker="03 · MOVIMIENTOS" text="Clasificar el comportamiento ayuda a pensar en escenarios. Ninguno de estos movimientos es una orden de entrada.">Movimientos comunes del mercado</Title>
        <div className="cards two">{movements.map(m=><article className="move" key={m.name}><div><span>{m.badge}</span><h3>{m.name}</h3></div><svg viewBox="0 0 100 100" preserveAspectRatio="none"><polyline points={m.points.map(p=>p.join(',')).join(' ')} /></svg><p>{m.description}</p><dl><dt>Qué observar</dt><dd>{m.watch}</dd><dt>Error común</dt><dd>{m.trap}</dd></dl></article>)}</div>
      </section>

      <section id="setups"><Title kicker="04 · JUGADAS / SETUPS" text="Un setup ordena una idea en vez de adivinar: contexto → condición → entrada posible → invalidación → gestión.">Jugadas importantes para estudiar</Title>
        <div className="cards two">{setups.map((s,i)=><article className="setup" key={s.title}><small>0{i+1} · {s.level}</small><h3>{s.title}</h3><b>Contexto</b><p>{s.context}</p><b>Plan</b><p>{s.plan}</p><b>Invalidación</b><p>{s.invalidation}</p><b>Error común</b><p>{s.mistake}</p></article>)}</div>
        <div className="question">¿Qué tendría que hacer el precio para demostrar que esta idea dejó de tener sentido?</div>
      </section>

      <section id="operar"><Title kicker="05 · ABRIR UNA OPERACIÓN" text="MT5 permite ejecutar muy rápido. Tu proceso debería hacerte revisar lentamente lo importante.">Flujo completo: de la idea a la orden</Title>
        <div className="flow">{[
          ['1','Instrumento','Seleccioná símbolo y confirmá qué activo estás operando.'],
          ['2','Dirección','BUY busca beneficiarse de subida; SELL, de bajada.'],
          ['3','Volumen','Define exposición. Un cero extra puede multiplicar el riesgo.'],
          ['4','Stop Loss','Nivel donde la idea queda invalidada y se intenta limitar la pérdida.'],
          ['5','Take Profit','Nivel previsto de salida con beneficio; comparalo con el riesgo.'],
          ['6','Tipo','Mercado entra al precio disponible; pendiente espera un precio/condición.'],
          ['7','Revisión','Símbolo, dirección, volumen, SL, TP, spread y contexto antes de enviar.']
        ].map(x=><div key={x[0]}><i>{x[0]}</i><b>{x[1]}</b><span>{x[2]}</span></div>)}</div>
        <div className="orderbox"><div><b>Orden — XAUUSDm</b><span>Ejemplo ficticio</span></div><label>Volumen<input value="0.01" readOnly/></label><label>Stop Loss<input value="4177.00" readOnly/></label><label>Take Profit<input value="4192.00" readOnly/></label><button className="sell">Vender por mercado</button><button className="buy">Comprar por mercado</button></div>
        <h3 className="sub">Órdenes pendientes</h3><div className="cards four">{[['Buy Limit','comprar más abajo'],['Sell Limit','vender más arriba'],['Buy Stop','comprar más arriba'],['Sell Stop','vender más abajo']].map(x=><article key={x[0]}><h3>{x[0]}</h3><p>{x[1]}. La orden espera a que el precio alcance la condición indicada.</p></article>)}</div>
      </section>

      <section id="gestionar"><Title kicker="06 · GESTIONAR Y CERRAR" text="Después de entrar, el P/L flotante cambia segundo a segundo. La gestión consiste en seguir el plan, no perseguir cada movimiento.">Qué hacer con una posición abierta</Title>
        <div className="position"><b>XAUUSDm</b><span className="blue">buy</span><span>0.01 lot</span><span>Entrada 4182.06</span><span>SL 4177.00</span><span>TP 4192.00</span><strong>−1.57</strong><button>×</button></div>
        <div className="cards two">{[
          ['Modificar SL/TP','Clic derecho sobre la posición → Modificar o eliminar orden. Cambiá solo lo que tu plan permite.'],
          ['Cerrar manualmente','Doble clic → Cerrar por mercado; o clic derecho → Cerrar orden. Con One-Click, la X puede cerrar inmediatamente.'],
          ['Slippage','En movimientos bruscos, el cierre puede ocurrir al siguiente precio disponible, no exactamente en el nivel visual.'],
          ['Revisión posterior','Guardá captura, contexto, entrada, invalidación, salida, resultado y si respetaste el proceso.']
        ].map(x=><article key={x[0]}><h3>{x[0]}</h3><p>{x[1]}</p></article>)}</div>
      </section>

      <section id="riesgo"><Title kicker="07 · RIESGO Y DISCIPLINA" text="El objetivo no es adivinar cada vela: es poder sobrevivir suficientes operaciones para evaluar si tu proceso funciona.">Controlá primero cuánto podés perder</Title><RiskTool/>
        <div className="riskgrid"><div><h3>Checklist antes de ejecutar</h3>{['Puedo explicar el escenario sin “porque siento que sube/baja”.','Sé dónde queda invalidada la idea.','El volumen respeta mi límite de riesgo.','Conozco spread y costes.','No estoy entrando por FOMO.','Sé qué haré en stop, objetivo o lateralización.','No pienso ampliar el stop para evitar aceptar una pérdida.','Voy a registrar la operación.'].map((x,i)=><label key={x}><input type="checkbox"/><span>{String(i+1).padStart(2,'0')}　{x}</span></label>)}</div><div><h3>Consejos útiles</h3>{tips.map((x,i)=><p key={x}><b>{i+1}</b>{x}</p>)}</div></div>
      </section>

      <section id="glosario"><Title kicker="08 · GLOSARIO" text="Definiciones pensadas para reconocer el término dentro de MT5 y entender qué cambia en una operación.">Glosario completo del trader</Title>
        <div className="search"><input placeholder="Buscar: spread, lotes, stop loss..." value={q} onChange={e=>setQ(e.target.value)}/><select value={cat} onChange={e=>setCat(e.target.value)}>{cats.map(c=><option key={c}>{c}</option>)}</select><span>{terms.length} términos</span></div>
        <div className="cards three">{terms.map(g=><article className="term" key={g.term}><small>{g.category}</small><h3>{g.term}</h3><b>{g.short}</b><p>{g.detail}</p></article>)}</div>
      </section>

      <section id="biblioteca"><Title kicker="09 · BIBLIOTECA" text="Seleccioné clásicos de trading con alta presencia histórica y abundantes reseñas. Los rankings de Amazon son dinámicos, así que no los convierto en una clasificación fija.">Libros usados como referencia conceptual</Title>
        <div className="books">{books.map((b,i)=><article key={b.title}><div><span>0{i+1}</span><b>{b.title}</b><small>{b.author}</small></div><section><em>{b.tag}</em><h3>{b.focus}</h3><p>{b.takeaway}</p></section></article>)}</div>
        <div className="sources"><h3>Documentación primaria de plataforma</h3><a href="https://get.exness.help/hc/es/articles/360011514572-MT5-gu%C3%ADa-de-trading-escritorio" target="_blank">Exness — MT5 escritorio ↗</a><a href="https://get.exness.help/hc/en-us/articles/360017263680-Setting-stop-loss-SL-and-take-profit-TP" target="_blank">Exness — SL y TP ↗</a><a href="https://get.exness.help/hc/en-us/articles/11541096471068-Closing-orders" target="_blank">Exness — Cerrar órdenes ↗</a><a href="https://www.metatrader5.com/en/terminal/help" target="_blank">MetaTrader 5 — ayuda oficial ↗</a></div>
      </section>
      <footer><b>Trader Guide · Exness + MT5</b><span>Educación primero. Las decisiones de trading son siempre tuyas.</span></footer>
    </main>
  </div>
}
export default App
