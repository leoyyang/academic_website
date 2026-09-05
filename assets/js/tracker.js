(() => {
  'use strict';
  const init = () => {
    const D = window.JobTrackerData;
    const byId = id => document.getElementById(id);
    const controls = byId('tracker-controls'), error = byId('tracker-error');
    const start = byId('startDate'), end = byId('endDate'), measure = byId('measure');
    const names = {'58':'Platform A', zl:'Platform B', qcwy:'Platform C', liepin:'Platform D'};
    const colors = ['#d98276','#53a6a0','#72a1d0','#b08bbb'];
    let data, chart, currentView;
    const showError = message => { error.textContent = message; error.hidden = !message; };
    const clearResults = () => {
      chart?.destroy(); chart = null;
      byId('statsGrid').replaceChildren(); byId('tracker-table-body').replaceChildren();
      byId('tracker-table').hidden = true;
      byId('chart-description').textContent = '';
      currentView = null;
      byId('tracker-chart-panel').hidden = true;
    };
    const renderChart = () => {
      if (!currentView) return;
      const {labels, baseline, counts} = currentView;
      chart?.destroy(); chart = null;
      if (!window.Chart) { showError('The chart could not load. The observations are still available in the data table.'); return; }
      const styles = getComputedStyle(document.body);
      const datasets = D.platforms.map((key,i) => ({
        label: names[key],
        data: counts[key].map(value => value === null ? null : measure.value === 'index' ? value / data[key][baseline] * 100 : value),
        borderColor: colors[i], backgroundColor: colors[i], borderWidth: 2,
        pointRadius: labels.length > 45 ? 0 : 2, pointHoverRadius: 4,
        spanGaps: false, tension: 0
      }));
      byId('tracker-chart-panel').hidden = false;
      chart = new Chart(byId('jobChart'), {
        type: 'line', data: {labels,datasets}, options: {
          responsive: true, maintainAspectRatio: false, animation: false,
          interaction: {mode: 'index', intersect: false},
          plugins: {legend: {labels: {color: styles.getPropertyValue('--ink').trim(), boxWidth: 16}}, tooltip: {callbacks: {label: context => `${context.dataset.label}: ${context.parsed.y?.toLocaleString('en-US',{maximumFractionDigits:1}) ?? 'No observation'}`}}},
          scales: {
            x: {ticks: {autoSkip:true,maxTicksLimit:6,maxRotation:0,color:styles.getPropertyValue('--muted').trim(),callback:function(value) {return this.getLabelForValue(value).slice(5);}},grid:{display:false}},
            y: {beginAtZero:true,title:{display:true,text:measure.value === 'index' ? 'Index (baseline = 100)' : 'Observed postings',color:styles.getPropertyValue('--muted').trim()},ticks:{color:styles.getPropertyValue('--muted').trim(),callback:value=>new Intl.NumberFormat('en-US',{notation:'compact'}).format(value)},grid:{color:styles.getPropertyValue('--line').trim()}}
          }
        }
      });
    };
    function renderTable(view) {
      const fragment = document.createDocumentFragment();
      view.labels.forEach((date,i) => {
        const row = document.createElement('tr');
        const dateCell = document.createElement('th'); dateCell.scope='row'; dateCell.textContent=date; row.append(dateCell);
        D.platforms.forEach(key => {const cell=document.createElement('td');const value=view.counts[key][i];cell.textContent=value===null?'—':value.toLocaleString('en-US');row.append(cell);});
        fragment.append(row);
      });
      byId('tracker-table-body').replaceChildren(fragment);byId('tracker-table').hidden=false;
    }
    function renderStats() {
      const fragment = document.createDocumentFragment();
      D.platforms.forEach(key => {
        const item=D.latest(data,key,start.value,end.value), card=document.createElement('div');card.className='tracker-stat';
        const name=document.createElement('h2');name.textContent=names[key];
        const value=document.createElement('p');value.className='stat-number';value.textContent=item ? item.value.toLocaleString('en-US'):'—';
        const date=document.createElement('p');date.className='stat-date';date.textContent=item ? `Observed ${item.date}`:'No observations in this range';
        card.append(name,value,date);fragment.append(card);
      });
      byId('statsGrid').replaceChildren(fragment);
    }
    function applyRange(event) {
      event?.preventDefault(); showError('');
      try {
        const view=D.view(data,start.value,end.value);
        if (!view.hasData) throw new Error('No observations are available in this range. Choose different dates.');
        if (measure.value==='index' && !view.baseline) throw new Error('No common positive baseline is available for all four platforms. Choose a different range or use observed postings.');
        currentView=view;
        byId('chart-description').textContent=measure.value==='index' ? `${start.value} to ${end.value}. All platforms indexed to 100 on ${view.baseline}. Gaps indicate missing observations.` : `${start.value} to ${end.value}. Observed counts, with missing observations shown as gaps.`;
        renderChart();renderStats();renderTable(view);
      } catch (problem) {clearResults();showError(problem.message);}
    }
    function resetRange() {
      const selected=D.last30(data);if (!selected) return;
      start.value=selected.start;end.value=selected.end;measure.value='count';applyRange();
    }
    async function load() {
      controls.hidden=true;byId('retry-data').hidden=true;showError('');clearResults();
      byId('data-freshness').textContent='Loading data coverage…';
      try {
        const response=await fetch('/job-tracker/data/job-data.json',{cache:'no-cache'});
        if(!response.ok) throw new Error('Data could not be loaded. Please try again.');
        data=D.normalise(await response.json());
        const dates=D.dates(data);if(!dates.length) throw new Error('No valid observations are available yet.');
        const last=dates.at(-1), today=new Date().toLocaleDateString('en-CA',{timeZone:'Asia/Shanghai'});
        const age=Math.max(0,Math.floor((Date.parse(today+'T00:00:00Z')-Date.parse(last+'T00:00:00Z'))/86400000));
        byId('data-freshness').textContent=`Data through ${last}${age>2 ? ` · Latest observation is ${age} days old; the series is not current.` : ''}`;
        byId('data-freshness').classList.toggle('stale',age>2);
        [start,end].forEach(input=>{input.min=dates[0];input.max=last;});
        controls.hidden=false;resetRange();
      } catch(problem) {byId('data-freshness').textContent='Data coverage unavailable';showError(problem.message);byId('retry-data').hidden=false;}
    }
    controls.addEventListener('submit',applyRange);
    byId('reset-range').addEventListener('click',resetRange);
    byId('retry-data').addEventListener('click',load);
    const themeObserver=new MutationObserver(mutations=>{if(mutations.some(m=>m.oldValue?.split(' ').includes('dark')!==document.body.classList.contains('dark')))renderChart();});
    themeObserver.observe(document.body,{attributes:true,attributeFilter:['class'],attributeOldValue:true});
    load();
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
