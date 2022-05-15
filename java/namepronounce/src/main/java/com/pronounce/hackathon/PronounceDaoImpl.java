package com.pronounce.hackathon;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

@Repository
public class PronounceDaoImpl implements PronounceDao {
	@Autowired
	JdbcTemplate jdbcTemplate;
	private final String INSERT_SQL = "INSERT INTO Pronounce(name,gender,country,phoneme,grafeme,language,filename,empid) values (?,?,?,?,?,?,?,?) ";
	private final String SELECT_SQL_NAME = "SELECT id,name,gender,country,phoneme,grafeme,language,filename,empid,likes,dislikes FROM Pronounce WHERE name=?";
	private final String SELECT_SQL_NAME_LANG = "SELECT id,name,gender,country,phoneme,grafeme,language,filename,empid,likes,dislikes FROM Pronounce WHERE name=? and language=?";
	private final String SELECT_SQL_ID = "SELECT id,name,gender,country,phoneme,grafeme,language,filename,empid,likes,dislikes FROM Pronounce WHERE id=?";
	private final String SELECT_SQL_FILENAME = "SELECT id,name,gender,country,phoneme,grafeme,language,filename,empid,likes,dislikes FROM Pronounce WHERE filename=?";
	private final String SELECT_SQL_EMP_ID = "SELECT id,name,gender,country,phoneme,grafeme,language,filename,empid,likes,dislikes FROM Pronounce WHERE empid=?";

	@Override
	public List<PronounceDetails> findAll() {

		 return jdbcTemplate.query("select * from Pronounce", new PronounceRowMapper());
	}

	@Override
	public PronounceDetails create(PronounceDetails pronounce) {
		
		KeyHolder holder = new GeneratedKeyHolder();
		jdbcTemplate.update(new PreparedStatementCreator() {
			@Override
			public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {
				PreparedStatement ps = connection.prepareStatement(INSERT_SQL, Statement.RETURN_GENERATED_KEYS);
				ps.setString(1, pronounce.getName());
				ps.setString(2, pronounce.getGender());
				ps.setString(3, pronounce.getCountry());
				ps.setString(4, pronounce.getPhoneme());
				ps.setString(5, pronounce.getGrafeme());
				ps.setString(6, pronounce.getLanguage());
				ps.setString(7, pronounce.getFilename());
				ps.setString(8, pronounce.getEmpid());
				return ps;
			}
		}, holder);

		int newId = holder.getKey().intValue();
		pronounce.setId(Long.valueOf(newId));
		return pronounce;
	}

	@Override
	public List<PronounceDetails> fetch(String name, String id, String filename,String language,String empid) {
		if(empid != null) {
			return jdbcTemplate.query(SELECT_SQL_EMP_ID, new Object[] {empid}, new PronounceRowMapper());
		}else
		if(name != null && language != null) {
			return jdbcTemplate.query(SELECT_SQL_NAME_LANG, new Object[] {name,language}, new PronounceRowMapper());
		}else if(name != null) {
			return jdbcTemplate.query(SELECT_SQL_NAME, new Object[] {name}, new PronounceRowMapper());
		}else if(id != null) {
			return jdbcTemplate.query(SELECT_SQL_ID, new Object[] {id}, new PronounceRowMapper());
		}else if(filename != null) {
			return jdbcTemplate.query(SELECT_SQL_FILENAME, new Object[] {filename}, new PronounceRowMapper());
		}
		return null;
	}



}
class PronounceRowMapper implements RowMapper<PronounceDetails> {
    @Override
    public PronounceDetails mapRow(ResultSet rs, int rowNum) throws SQLException {
    	PronounceDetails pronounce = new PronounceDetails();

    	pronounce.setId(rs.getLong("id"));
    	pronounce.setLanguage(rs.getString("language"));
    	pronounce.setCountry(rs.getString("country"));
    	pronounce.setGender(rs.getString("gender"));
    	pronounce.setName(rs.getString("name"));
    	pronounce.setFilename(rs.getString("filename"));
    	pronounce.setPhoneme(rs.getString("phoneme"));
    	pronounce.setGrafeme(rs.getString("grafeme"));
    	pronounce.setEmpid(rs.getString("empid"));
    	pronounce.setLikes(rs.getInt("likes"));
    	pronounce.setDislikes(rs.getInt("dislikes"));
        return pronounce;
    }
}