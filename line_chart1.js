
      const chartData1 = {
        labels: [],
        datasets: [{
          label: 'O3 Concentration (in ppm ) ',
          data: [],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      };

      const ctx1 = document.getElementById('line_chart1').getContext('2d');
      const chart1 = new Chart(ctx1, {
        type: 'line',
        data:chartData1,
        options: {
          responsive: true,
          scales: {
            //y: {
              //min: 0,
              //max: 100
            //}
          }
        }
      });


      // line_chart2


      const chartData2 = {
        labels: [],
        datasets: [{
          label: 'NOx concentration(in ppm) ',
          data: [],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }

        ]
      };

      const ctx2 = document.getElementById('line_chart2').getContext('2d');
      const chart2 = new Chart(ctx2, {
        type: 'line',
        data: chartData2,
        options: {
          responsive: true,
          scales: {
            //y: {
              //min: 0,
              //max: 3
            //}
          }
        }
      });
    //line chart 3
 const chartData3 = {
        labels: [],
        datasets: [{
          label: 'SO2 concentration (in ppm) ',
          data: [],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }

        ]
      };

      const ctx3 = document.getElementById('line_chart3').getContext('2d');
      const chart3 = new Chart(ctx3, {
        type: 'line',
        data: chartData3,
        options: {
          responsive: true,
          scales: {
            //y: {
              //min: 0,
              //max: 6
            //}
          }
        }
      });
	
    //line chart 4 

 const chartData4 = {
        labels: [],
        datasets: [{
          label: 'CO concentration (in ppm) ',
          data: [],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }

        ]
      };

      const ctx4 = document.getElementById('line_chart4').getContext('2d');
      const chart4 = new Chart(ctx4, {
        type: 'line',
        data: chartData4,
        options: {
          responsive: true,
          scales: {
            //y: {
              //min: 0,
              //max: 3
            //}
          }
        }
      });








  // Simulate new data arriving every minute
      setInterval(() => {
            var now = new Date();

    // format the time as a string in the desired format
    sec = now.getSeconds();
    if(sec<5){
      sec=0;
    }
    else{
      sec=sec-5;
    }
    var timeStr = `${now.getFullYear()}_${(now.getMonth() + 1).toString().padStart(2, '0')}_${now.getDate().toString().padStart(2, '0')}_${now.getHours().toString().padStart(2, '0')}_${now.getMinutes().toString().padStart(2, '0')}_	${sec.toString().padStart(2, '0')}`;
     	
	


  //var now = new Date();
  var year = now.getFullYear();
  var month = now.getMonth() + 1;
  var day = now.getDate();
  var hours = now.getHours();
  var minutes = now.getMinutes();
  if(minutes>2){
	minutes = minutes-2;}
  else{
	minutes =0;}
  // Add leading zeros to ensure two digits
  month = ('0' + month).slice(-2);
  day = ('0' + day).slice(-2);
  hours = ('0' + hours).slice(-2);
  minutes = ('0' + minutes).slice(-2);
  
  timeStr =  'RPT5_' + year + month + day + '_' + hours + minutes;

console.log(timeStr);
url = "http://10.20.0.118:8000/Data/"+timeStr+".csv";




	  fetch(url, { method: 'HEAD' })
  .then(response => {
    if (response.ok) {
      // If the file exists, fetch it and process the data
      fetch(url)
        .then(response => response.text())
        .then(data => {
	  const lines = data.trim().split('\n');
          const cols=lines[1].split(',');
          console.log(cols);

		
	var randomData = parseFloat(cols[1]);
        chartData1.labels.push(new Date().toLocaleTimeString());
        chartData1.datasets[0].data.push(randomData);

         randomData = parseFloat(cols[5]);
        chartData2.labels.push(new Date().toLocaleTimeString());
        chartData2.datasets[0].data.push(randomData);

	randomData = parseFloat(cols[9]);
        chartData3.labels.push(new Date().toLocaleTimeString());
        chartData3.datasets[0].data.push(randomData);


	randomData = parseFloat(cols[11]);
        chartData4.labels.push(new Date().toLocaleTimeString());
        chartData4.datasets[0].data.push(randomData);

        // Shift the chart leftward after plotting 10 points
        if (chartData1.labels.length > 100) {
          chartData1.labels.shift();
          chartData1.datasets[0].data.shift();
	  chartData2.labels.shift();
          chartData2.datasets[0].data.shift();
	  chartData3.labels.shift();
          chartData3.datasets[0].data.shift();
	  chartData4.labels.shift();
          chartData4.datasets[0].data.shift();
        }

        chart1.update();
        chart2.update();
	chart3.update();
	chart4.update();
		
        });
    } else {
      // If the file does not exist, call fetchData again after a delay
      // setTimeout(setData(data.datasets[0].data),1000);
    }
  })
  .catch(error => {
    console.error('Error checking file existence: ' + error.message);
    // If an error occurs, call fetchData again after a delay
    // setTimeout(setData(data.datasets[0].data),1000);
  }); 




      }, 30000);