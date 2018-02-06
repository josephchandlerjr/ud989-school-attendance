var model = {
	records: null,
	init: function(){
		this.records = [
		{name:'Geoffry the Giraffe', attendance: [1,0,1,0,1,0,0,1,1,0,0,0]},
		{name:'Slappy the Frog',     attendance: [1,0,1,0,0,0,1,1,1,1,0,1]},
		{name:'Lilly the Lizard',    attendance: [0,0,0,0,0,1,0,0,0,0,0,1]},
		{name:'Paulrus the Walrus',  attendance: [1,0,1,1,0,1,1,1,1,1,0,0]},
		{name:'Gregory the Goat	',   attendance: [1,0,1,0,1,0,0,1,1,0,0,0]},
		{name:'Adam the Anaconda',   attendance: [1,0,1,0,1,1,1,1,0,1,0,1]}
		];
	},
	getRecords: function(){return this.records;},
	updateAttendance: function(studentNum,day,attend){
		this.records[studentNum].attendance[Number(day)] = attend;
	}
};
var view = {
		init: function(){
			var records = octopus.getRecords();		
			this.buildNameHeaders(records);
			this.buildStudentRows(records);
		},
		buildNameHeaders: function(records){
			document.querySelector('thead tr').innerHTML = '';
			var colHead = $("thead tr");
			colHead.append($('<th class="name-col">Student Name</th>'));
			var count = records[0].attendance.length;
			for (var i=1; i <= count; i++){
				colHead.append($('<th>'+i+'</th>'));
			}
			colHead.append($('<th class="missed-col">Days Missed-col</th>'));	
		},
		buildStudentRows: function(records){
			document.querySelector('tbody').innerHTML = '';
			records.forEach(function(item,ix){
				var body = $('tbody');
				var tr = $('<tr class="student"></tr>');
				tr.attr('ix',ix);
				var name = $(' <td class="name-col">'+ item.name +'</td>');
				tr.on('change', 'input', function(evt){
						octopus.updateAttendance(ix,evt.target.getAttribute('day'),$(evt.target).prop('checked')+0);
					});
				item.attendance.forEach(function(item,ix){
					var td = $('<td class="attend-col"></td>')
					var checkbox = $('<input type="checkbox">');
					checkbox.attr('day',ix);
					if (item === 1	){
						checkbox.prop('checked',true);
					}
					td.append(checkbox);
					tr.append(td);
				});
				tr.append('<td class="missed-col">'+octopus.getDaysMissed(item.attendance)+'</td>');
				tr.prepend(name);
				body.append(tr);
			});
		}
};
var octopus = {
	init: function(){ 
		model.init();
		view.init();
	},
	getRecords: function(){ return model.getRecords();},
	updateAttendance: function(studentNum, day,attend){ 
		model.updateAttendance(studentNum,day,attend);
		view.init();
	},
	getDaysMissed: function(arr){
		var attended = arr.reduce(function(accum,value){return accum + value;});
		return arr.length - attended;
	}
};

octopus.init();


