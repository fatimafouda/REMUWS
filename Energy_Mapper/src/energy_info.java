

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class energy_info extends HttpServlet {
	private static final long serialVersionUID = 1L;
     
    public energy_info() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		// Set HTTP GET response as a JSON format, for jQuery to parse
		response.setContentType("application/json");
		
		// Set output stream writer
		PrintWriter printwriter =response.getWriter();
		
		try {
			// Initiate console thread to call Octave scripts and read its output as a string
			Process p;
			// TODO change directory according to running machine
			p = Runtime.getRuntime().exec("octave --silent /.../energy_forecast.m");
			p.waitFor();
			
			// Read Octave output and place onto a string
			// NOTE: Octave already produces output as JSON
			StringBuffer st= new StringBuffer();
			BufferedReader reader = new BufferedReader(new InputStreamReader(p.getInputStream()));
			String line="";
			while((line=reader.readLine())!=null)
				st.append(line + "\n");
			
			// Print output as HTTP response
			printwriter.println(st.toString());
			
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		
	}

}
