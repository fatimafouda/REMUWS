city = cellstr(['cair';'alex';'aswn';'sant';'shrm';'mnya';'sfga';'luxr';'asyt']);

for i = 1:size(city)(1)

	% Read csv file
	y = csvread(strcat("/home/ahmed/Downloads/",city{i},"-solar.csv"));

	y = (y / 432)*10000;

	% Map matrix to separate columns
	y1 = y(:,1);
	y2 = y(:,2);
	y3 = y(:,3);
	y4 = y(:,4);
	y5 = y(:,5);

	% Concatenate the columns into a single row
	yi = transpose(cat(1,y1,y2,y3,y4,y5));

	% Define X axis
	x = [1:1825];

	% Obtain ployfit of first degree
	f1 = polyval(polyfit(x,yi,1),x);

	% Obtain the gradient of that line
	g = gradient(f1)(1);

	% Redfine X axis
	x = [1:365];

	% Obtain polyfit of latest year to act as template for upcoming year predictions
	f6 = polyval(polyfit(x,transpose(y5),6),x);

	% Obtain 6th year by slope shifting the polyfit of latest year
	y6 = f6 + (g*[366:730]);

	% Obtain annual and quarterly averages
	y6Values = [1:5];

	y6Values(1) = mean(y6);

	y6Values(2) = mean(y6(1:91));

	y6Values(3) = mean(y6(92:183));

	y6Values(4) = mean(y6(184:274));

	y6Values(5) = mean(y6(275:365));

	y7 = f6 + (g*[731:1095]);

	y7Values = [1:5];

	y7Values(1) = mean(y7);

	y7Values(2) = mean(y7(1:91));

	y7Values(3) = mean(y7(92:183));

	y7Values(4) = mean(y7(184:274));

	y7Values(5) = mean(y7(275:365));

	y8 = f6 + (g*[1096:1460]);

	y8Values = [1:5];

	y8Values(1) = mean(y8);

	y8Values(2) = mean(y8(1:91));

	y8Values(3) = mean(y8(92:183));

	y8Values(4) = mean(y8(184:274));

	y8Values(5) = mean(y8(275:365));

	a = ceil([y6Values ; y7Values ; y8Values]);

	% Read csv file
	y = csvread(strcat("/home/ahmed/Downloads/",city{i},"-wind.csv"));

	y = y*(log(100/0.03)/log(1/0.03));

	y = 0.6*(y.^3);

	% Map matrix to separate columns
	y1 = y(:,1);
	y2 = y(:,2);
	y3 = y(:,3);
	y4 = y(:,4);
	y5 = y(:,5);

	% Concatenate the columns into a single row
	yi = transpose(cat(1,y1,y2,y3,y4,y5));

	% Define X axis
	x = [1:1825];

	% Obtain ployfit of first degree
	f1 = polyval(polyfit(x,yi,1),x);

	% Obtain the gradient of that line
	%g = gradient(f1)(1);
	g = 0;

	% Redfine X axis
	x = [1:365];

	% Obtain polyfit of latest year to act as template for upcoming year predictions
	f6 = polyval(polyfit(x,transpose(y5),6),x);

	% Obtain 6th year by slope shifting the polyfit of latest year
	y6 = f6 + (g*[366:730]);

	% Obtain annual and quarterly averages
	y6Values = [1:5];

	y6Values(1) = mean(y6);

	y6Values(2) = mean(y6(1:91));

	y6Values(3) = mean(y6(92:183));

	y6Values(4) = mean(y6(184:274));

	y6Values(5) = mean(y6(275:365));

	y7 = f6 + (g*[731:1095]);

	y7Values = [1:5];

	y7Values(1) = mean(y7);

	y7Values(2) = mean(y7(1:91));

	y7Values(3) = mean(y7(92:183));

	y7Values(4) = mean(y7(184:274));

	y7Values(5) = mean(y7(275:365));

	y8 = f6 + (g*[1096:1460]);

	y8Values = [1:5];

	y8Values(1) = mean(y8);

	y8Values(2) = mean(y8(1:91));

	y8Values(3) = mean(y8(92:183));

	y8Values(4) = mean(y8(184:274));

	y8Values(5) = mean(y8(275:365));

	b = ceil([ y6Values ; y7Values ; y8Values]);

	payload(i) = struct('city',city{i},'solar',a,'wind',b);

	
end

c = savejson('data',payload);

disp(c);
