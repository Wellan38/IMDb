
import java.io.File;
import java.io.PrintWriter;
import javax.servlet.http.HttpServletRequest;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author Alex-Laptop
 */
public abstract class Action
{
    public abstract void execute(HttpServletRequest request, PrintWriter out, File folder);
}
